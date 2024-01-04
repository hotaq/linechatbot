const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');
const express = require('express');
const app = express().use(bodyParser.json());
const port = process.env.PORT || 3005
const axios = require('axios');

const apiUrl = 'http://127.0.0.1:8080';



app.post('/webhook',(request,response)=>{
    const _agent = new WebhookClient({  request: request, response: response});
    function Welcome(agent){
        agent.add(`สวัสดีครับผม LPBS ถ้าคุณต้องการตรวจโรคหลอดเลือดสมอง พิมพ์ => information หรื ตรวจสอบข้อมูล...`)
    }
    
    function ตรวจสอบข้อมูล(agent) {
        agent.add(`เพศของคุณ ตอบเป็นตัวเลข 1.ชาย 2.หญิง 11` )
    }
    function ตอบเพศ(agent){
        gender = agent.parameters.number;
        agent.context.set({
            name: 'gender',
            lifespan: 10,
            parameters: { gender: gender },
        });
        agent.add(`อายุของคุณ`)
        if(gender==1){
            agent.add(`1`)
        }
        else{
            agent.add(`2`)
        }
        
        
    }
    function ตอบอายุ(agent){
        age = agent.parameters.number
        const genderContext = _agent.context.get('gender')
        const gender = genderContext.parameters.gender
        console.log(gender)
        agent.context.set({
            name: 'age',
            lifespan: 10,
            parameters: { age: age },
        });
        agent.add(`ความดันโลหิตสูง ตอบเป็นตัวเลข 1.ใช่ 2.ไม่`)
        if(age >0){
            agent.add(`HI`)
        }
        

    }
    function ตอบโลหิตสูง(agent){
        hyper = agent.parameters.number;
        agent.context.set({
            name: 'hyper',
            lifespan: 10,
            parameters: { hyper: hyper },
        });
        agent.add(`คุณเคยหรือเป็นโรคหัวใจหรือไม่ ตอบเป็นตัวเลข 1.ใช่ 2.ไม่`);
        if(hyper >=0){
            agent.add(`ตอบโลหิตสูง`)
        }
        return hyper
    }
    function ตอบโรคหัวใจ(agent){
        heart = agent.parameters.number;
        agent.context.set({
            name: 'heart',
            lifespan: 10,
            parameters: { heart: heart },
        });
        agent.add(`คุณเคยแต่งงานหรือยัง 1.เคย 2.ไม่เคย`)
        if(heart >=0){
            agent.add(`ตอบโรคหัวใจ`)
        }
        return heart
    }
    function ตอบเคยแต่งงาน(agent){
        marry = agent.parameters.number;
        agent.context.set({
            name: 'marry',
            lifespan: 10,
            parameters: { marry: marry },
        });
        agent.add(`คุณทำงานแบบไหน 0.Govt_job  1.Private  2.Self-employed 3.children`)
        if(marry >=0){
            agent.add(`ตอบเคยแต่งงาน`)
        }
        return marry
    }
    function ตอบการทำงาน(agent){
        work = agent.parameters.number;
        agent.context.set({
            name: 'work',
            lifespan: 10,
            parameters: { work: work },
        });
        agent.add(`คุณอาศัยอยู่บริวเณใด 1.ในเมือง 2.นอกเมือง`)
        if(work >=0){
            agent.add(`ตอบการทำงาน`)
        }
        return work
    }
    function ตอบที่อยู่อาศัย(agent){
        live = agent.parameters.number;
        agent.context.set({
            name: 'live',
            lifespan: 10,
            parameters: { live: live },
        });
        agent.add(`ค่าเฉลี่ยน้ำตาลในเลื่อดของคุณ`)
        if(live >=0){
            agent.add(`ตอบที่อยู่อาศัย`)
        }
        return live
    }
    function ตอบน้ำตาลในเลือด(agent){
        glucose = agent.parameters.number;
        agent.context.set({
            name: 'glucose',
            lifespan: 10,
            parameters: { glucose: glucose },
        });
        agent.add(`ค่า BMI ของคุณ`)
        if(glucose >=0){
            agent.add(`ตอบน้ำตาลในเลือด`)
        }
        return glucose
    }
    function ตอบBMI(agent){
        bmi = agent.parameters.number;
        agent.context.set({ 
            name: 'bmi',
            lifespan: 10,
            parameters: { bmi: bmi },
        });
        agent.add(`พฤติกรรมการสูบบุหรี่ของคุณ   1.เคยสูบบุหรี่ 2.ไม่เคยสูบบุหรี่ 3.สูบบุหรี่`)
        if(bmi >=0){
            agent.add(`ตอบBMI`)
        }
        
    }
    function ตอบสูบบุหรี่(agent){
        smoke = agent.parameters.number;
        const bmiContext = _agent.context.get('bmi')
        const bmi = genderContext.parameters.bmi
        agent.context.set({
            name: 'smoke',
            lifespan: 10,
            parameters: { smoke: smoke },
        });
        agent.add(`ขอบคุณสำหรับการกรอกข้อมูลระบบกำลังประมวลผ  ....`)
        if(smoke >=0){
            agent.add(`ตอบสูบบุหรี่`)
        }
        agent.add(`...s.awva`)
        agent.add(`พิมพ์ยืนยัน`)
        
        return smoke
    }
    

    
    function ข้อมูล(agent){
        agent.add('กำลังส่งข้ัอมูล')
        
    
        const genderContext = _agent.context.get('gender');  // Corrected typo here
        const hyperContext = _agent.context.get('hyper');
        const ageContext = _agent.context.get('age');
        const smokeContext = _agent.context.get('smoke');
        const bmiContext = _agent.context.get('bmi');  
        const liveContext = _agent.context.get('live');
        const workContext = _agent.context.get('work');
        const glucoseContext = _agent.context.get('glucose');
        const marryContext = _agent.context.get('marry');
        
        const gender = genderContext.parameters.gender;
        const hyper = hyperContext.parameters.hyper;
        const age = ageContext.parameters.age;
        const bmi = bmiContext.parameters.bmi;  
        const live = liveContext.parameters.live;
        const work = workContext.parameters.work;
        const glucose = glucoseContext.parameters.glucose;
        const marry = marryContext.parameters.marry;
        const smoke = smokeContext.parameters.smoke;
        
        

        const postData = {
            gender: gender,
            age: age,
            hypertension: hyper,
            heart_disease: heart,
            ever_married: marry,
            work_type: work,
            avg_glucose_level: glucose,
            bmi: bmi,
            smoking_status: smoke,
        }
        
        axios.post(apiUrl, postData)
            .then(response => {
                console.log('Response:', response.data);
        })
            .catch(error => {
                console.error('Error:', error);
        })
        
            







            


            
        
    }   


   


   
   
        
   
    
    
    
    let intents = new Map()
    intents.set("Default Welcome Intent",Welcome)
    intents.set("ตรวจสอบข้อมูล",ตรวจสอบข้อมูล)
    intents.set("ตรวจสอบข้อมูล - ตอบเพศ ถามอายุ",ตอบเพศ)
    intents.set("ตรวจสอบข้อมูล - ตอบอายุ-ถามความดันโลหิตสูง",ตอบอายุ)
    intents.set("ตรวจสอบข้อมูล - ตอบโลหิตสูง ถามโรคหัวใจ",ตอบโลหิตสูง)
    intents.set("ตรวจสอบข้อมูล - ตอบโรคหัวใจ ถามเคยแต่งงาน",ตอบโรคหัวใจ)
    intents.set("ตรวจสอบข้อมูล - ตอบเคยแต่งงาน ถามการทำงาน",ตอบเคยแต่งงาน)
    intents.set("ตรวจสอบข้อมูล - ตอบการทำงาน ถามที่อยู่อาศัย",ตอบการทำงาน)
    intents.set("ตรวจสอบข้อมูล - ตอบที่อยู่อาศัย -ถามน้ำตาลในเลือด",ตอบที่อยู่อาศัย)
    intents.set("ตรวจสอบข้อมูล - ตอบน้ำตาลในเลือด -ถามBMI",ตอบน้ำตาลในเลือด)
    intents.set("ตรวจสอบข้อมูล - ตอบBMI - ถามสูบบุหรี่",ตอบBMI)
    intents.set("ตรวจสอบข้อมูล - ตอบสูบบุหรี่ - ขอบคุณ",ตอบสูบบุหรี่)
    intents.set("ส่งข้อมูล",ข้อมูล)
    
    _agent.handleRequest(intents)
})

app.get('/',(req,res)=>{
    res.send('hello world')
})







app.listen(port,()=>{
    console.log('server runing on port :',port)
})