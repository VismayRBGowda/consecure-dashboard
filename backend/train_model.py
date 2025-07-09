import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib

df = pd.read_csv('../data/threats.csv')

X = df["Cleaned Threat Description"]
y = df["Threat Category"]

vectorizer = TfidfVectorizer(max_features=1000)
X_vec = vectorizer.fit_transform(X)

model = LogisticRegression()
model.fit(X_vec, y)


joblib.dump(model, "model/model.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")