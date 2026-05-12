import google.genai as genai
import os

class GeminiAssistant:
    def __init__(self):
        # API Key'i güvenli bir şekilde alıyoruz
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_name = "gemini-1.5-flash"

    def generate_analysis(self, context_data, user_query):
        prompt = f"""
        Sen AURA projesinin zeki asistanısın. 
        Sistem verileri: {context_data}
        Kullanıcı isteği: "{user_query}"
        
        Görevin: Verileri analiz et ve kullanıcıya profesyonel, 
        çözüm odaklı bir yanıt dön.
        """
        response = self.client.models.generate_content(
            model=self.model_name, 
            contents=prompt
        )
        return response.text.strip()
