from model import predict_stroke_result as prd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi import Form, Body

#creat app
app = FastAPI()
#midleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/')
def index():
    return {'message':'this is stroke API'}



@app.post('/predict')
def predict(
    gender: int = Body(...),
    age: int = Body(...),
    hypertension: int = Body(...),
    heart_disease: int = Body(...),
    ever_married: int = Body(...),
    work_type: int = Body(...),
    Residence_type: int = Body(...),
    avg_glucose_level: float = Body(...),
    bmi: float = Body(...),
    smoking_status: int = Body(...),
):
    result = {
    'gender': gender,
    'age': age,
    'hypertension': hypertension,
    'heart_disease': heart_disease,
    'ever_married': ever_married,
    'work_type': work_type,
    'avg_glucose_level': avg_glucose_level,
    'bmi': bmi,
    'smoking_status': smoking_status,
    }
    
    
    return {'prd is': prd(gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level	,bmi,smoking_status)} 
    
    

if __name__ == '__main__':
    uvicorn.run(app,host='127.0.0.1',port=8080)