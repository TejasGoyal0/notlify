import { db } from "../../infra/database.js"
import bcrypt from "bcrypt"
import { SignJWT, jwtVerify } from "jose";

interface SignupInput {
  email: string;
  name: string;
  password: string;
}

interface SigninInput {
  email: string;
  password: string;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "changeme");

export const authService = {
  // -----------------------------------
  // SIGNUP
  // -----------------------------------
  async signup(input: SignupInput) {
    const { email, name, password } = input;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      throw new Error("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        name,
        passwordHash,
      },
    });

    return user;
  },


  async signin(input: SigninInput) {
    const { email, password } = input;

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid email or password");
    }

    // Create JWT using JOSE
    const accessToken = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(JWT_SECRET);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    };
  },

  // -----------------------------------
  // VERIFY JWT (Optional helper)
  // -----------------------------------
  async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      return payload;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },
};
