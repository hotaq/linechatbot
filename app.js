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
        agent.add(`สวัสดีครับผม LPBS ถ้าคุณต้องการตรวจโรคหลอดเลือดสมอง พิมพ์ => information หรือ ตรวจสอบข้อมูล ตอบเป็นตัวเลขทั้งหมดนะครับ `)
        agent.add(`Hello, I am LPBS. If you want to check for a stroke, type => information or check information. Respond with all numeric answers, please`)
    }
    
    function ตรวจสอบข้อมูล(agent) {
        agent.add(`เพศของคุณ ?\n(gender ?)  \n------ \n1.ชาย (male) \n2.หญิง (female) \n------ ` )
    }
    function ตอบเพศ(agent){
        gender = agent.parameters.number;
        agent.context.set({
            name: 'gender',
            lifespan: 20,
            parameters: { gender: gender },
        });
        agent.add(`กรอกอายุของคุณ ?\n(Please enter your age.)`)

        
        
    }
    function ตอบอายุ(agent){
        age = agent.parameters.number
        const genderContext = _agent.context.get('gender');
        const gender = genderContext.parameters.gender;
         
        console.log(gender)
        agent.context.set({
            name: 'age',
            lifespan: 20,
            parameters: { age: age },
        });
        agent.add(`คุณความดันโลหิตสูงหรือป่าว ? \n(Do you have high blood pressure?) \n------ \n1.ใช่ (yes) \n2.ไม่ (no) \n------`)
        
        

    }
    function ตอบโลหิตสูง(agent){
        hyper = agent.parameters.number;
        agent.context.set({
            name: 'hyper',
            lifespan: 20,
            parameters: { hyper: hyper },
        });
        agent.add(`คุณเคยหรือเป็นโรคหัวใจหรือไม่ ? \n(Have you ever had or do you suffer from heart disease ?) \n------ \n1.ใช่ (yes)\n2.ไม่ (no) \n------`);
        
    }
    function ตอบโรคหัวใจ(agent){
        heart = agent.parameters.number
        agent.context.set({
            name: 'heart',
            lifespan: 20,
            parameters: { heart: heart },
        });
        agent.add(`คุณเคยแต่งงานหรือยัง \n(Have you ever been married or not?) \n------ \n1.เคย \n2.ไม่เคย \n------`)
    }
    function ตอบเคยแต่งงาน(agent){
        marry = agent.parameters.number;
        agent.context.set({
            name: 'marry',
            lifespan: 20,
            parameters: { marry: marry },
        });
        agent.add(`คุณทำงานแบบไหน ?\n(What kind of work do you do?) \n------ \n0.รัฐบาล (Govt_job)  \n1.ส่วนตัว (Private)  \n2.อาชีพอิสระ (Self-employed) \n3.เด็ก (children) \n------`)
    }
    function ตอบการทำงาน(agent){
        work = agent.parameters.number;
        agent.context.set({
            name: 'work',
            lifespan: 20,
            parameters: { work: work },
        });
        agent.add(`คุณอาศัยอยู่บริวเณใด \n(Where do you live?) \n------ \n 1.ในเมือง (in the city)  \n2.นอกเมือง (countryside) \n------`)
    
    }
    function ตอบที่อยู่อาศัย(agent){
        live = agent.parameters.number;
        agent.context.set({
            name: 'live',
            lifespan: 20,
            parameters: { live: live },
        });
        agent.add(`ค่าเฉลี่ยน้ำตาลในเลื่อดของคุณ ? \n(Average blood sugar level in your blood ?)`)
        
    }
    function ตอบน้ำตาลในเลือด(agent){
        glucose = agent.parameters.number;
        agent.context.set({
            name: 'glucose',
            lifespan: 20,
            parameters: { glucose: glucose },
        });
        agent.add(`ค่า BMI ของคุณ ? \n (Your BMI value ?)`)
        
    }
    function ตอบBMI(agent){
        bmi = agent.parameters.number;
        agent.context.set({ 
            name: 'bmi',
            lifespan: 20,
            parameters: { bmi: bmi },
        });
        agent.add(`พฤติกรรมการสูบบุหรี่ของคุณ \n (Your Smoking Behavior)   \n------ \n 1.เคยสูบบุหรี่ (Used to smoke cigarettes) \n 2.ไม่เคยสูบบุหรี่ (never smoked cigarettes) \n 3.สูบบุหรี่ (smoke) \n------`)
        
    }
    function ตอบสูบบุหรี่(agent){
        smoke = agent.parameters.number;
        const bmiContext = _agent.context.get('bmi')
        const bmi = bmiContext.parameters.bmi
        agent.context.set({
            name: 'smoke',
            lifespan: 20,
            parameters: { smoke: smoke },
        });
        agent.add(`พิมพ์ยืนยัน \n (Type to confirm)`)
       
        
        return smoke
    }
    

    
    function ข้อมูล(agent){
        agent.add('𝙇𝙤𝙖𝙙𝙞𝙣𝙜...')
        
        
        agent.add(`██▒▒▒▒▒▒▒▒ 20%`)
        agent.add(``)
        agent.add(`███████▒▒▒ 70%`)
        agent.add(``)
        agent.add(``)
        agent.add(`██████████ 100%`)
        
        const genderContext = _agent.context.get('gender'); 
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
        
        console.log(gender,age,hyper,marry,live,work,bmi,glucose,smoke)

        const originalData = {
            gender: 1,
            age: 1,
            hypertension: 1,
            heart_disease: 1,
            ever_married: 1,
            work_type: 1,
            Residence_type: 1,
            avg_glucose_level: 1,
            bmi: 1,
            smoking_status: 1
        };
        
        const convertedData = {
            "gender": originalData.gender,
            "age": originalData.age,
            "hypertension": originalData.hypertension,
            "heart_disease": originalData.heart_disease,
            "ever_married": originalData.ever_married,
            "work_type": originalData.work_type,
            "Residence_type": originalData.Residence_type || 1, 
            "avg_glucose_level": originalData.avg_glucose_level, 
            "bmi": originalData.bmi,
            "smoking_status": originalData.smoking_status
        };
        
        const apiUrl = 'http://127.0.0.1:8080/predict';
        
        axios.post(apiUrl, convertedData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        
        if( response.data== { 'prd is': 'stroke' }){
            agent.add('เหมือนว่าคุณจะมีความเสี่ยงการเป็นโรคหลอดเลือดสมองนะครับ \n (It seems that you may be at risk of having a cerebral vascular disease, sir.) ')
        }
        else{
            agent.add(`โอ้ เหมือนว่าคุณจะปลอดภัยจากโรคหลอดเลือดสมองนะครับ \n (Oh, it seems like you are safe from a cerebral blood vessel disease) `)
        }
        
        







            


            
        
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