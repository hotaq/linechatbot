import pandas as pd
import numpy as np 
from joblib import load
from sklearn.model_selection import GridSearchCV
from xgboost import XGBClassifier


model = load('C:/Users/hooto/Downloads/node js/h3.joblib')
## scaler = load()
def predict_stroke_result(gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level	,bmi,smoking_status):
    input_features = [gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status]
    prediction = model.predict([input_features])
    #update_res = prediction.flatten().astype(int)
    
    if prediction[0] == 1:
        return "stroke"
    elif prediction[0] ==0:
        return 'not stroke'
    

gender = 2
age = 67.0
hypertension = 0
heart_disease = 1
ever_married = 1
work_type = 1
Residence_type = 1
avg_glucose_level = 228.23
bmi = 36.4
smoking_status = 1

prediction_result = predict_stroke_result(gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level	,bmi,smoking_status)
## print(f"The prediction result is: {prediction_result}")