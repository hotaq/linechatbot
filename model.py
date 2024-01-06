import pandas as pd
import numpy as np 
from joblib import load
from sklearn.model_selection import GridSearchCV
from xgboost import XGBClassifier
from sklearn.preprocessing import StandardScaler 

model = load('C:/Users/hooto/Downloads/node js/h3.joblib')
## scaler = load()
scaler = StandardScaler()
def predict_stroke_result(gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level	,bmi,smoking_status):
    input_features = np.array([gender, age, hypertension, heart_disease, ever_married, work_type, Residence_type, avg_glucose_level, bmi, smoking_status])

    prediction = model.predict([input_features])
    
    
    if prediction[0] == 1:
        return "stroke"
    elif prediction[0] ==0:
        return 'not stroke'
    

gender = 1
age = 15
hypertension = 0
heart_disease = 1
ever_married = 1
work_type = 1
Residence_type = 1
avg_glucose_level = 185
bmi = 15
smoking_status = 1

prediction_result = predict_stroke_result(gender,age,hypertension,heart_disease,ever_married,work_type,Residence_type,avg_glucose_level	,bmi,smoking_status)
print(f"The prediction result is: {prediction_result}")