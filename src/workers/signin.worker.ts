import { Worker } from "bullmq";
import { signedinQueue } from "../queues/signedin.queue.js";
import { signedinemailService } from "../services/signedin-email.service.js"
import { redisConnection } from "../infra/redis.js";

const signinWorker = new Worker("signedin-queue",async(job) => {
    console.log("SignIn Worker Initialized" );
    
    if(job.name == "signedin-mail"){
        const {email} = job.data as {email:string}

        await signedinemailService.signedinmail({email});
        console.log("Signedin Email Sent for :" , email);
    }
},
    {connection : redisConnection});

signinWorker.on("completed", (job) => {
    console.log("SignIn Job Completed Successfully" , job.id)
});

signinWorker.on("failed", (job,err) => {
    console.log("SignIn Job Failed: " , job?.id , err);
});