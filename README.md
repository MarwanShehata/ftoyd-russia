https://hh.ru/vacancy/117670791?hhtmFrom=chat

### **Test Assignment 1** 🚀

Develop a simple web application, **"Match Tracker"**, which should:

1. Load a list of matches from an API.
2. Display team names, scores, and match status.
3. Allow users to refresh the data by clicking the **"Refresh"** button.
4. Show a loading indicator when fetching data.
5. Display an error message if the API is unavailable.

---

💡 **Next.js is optional**. If you use Next.js:

- You may use `getServerSideProps` or `getStaticProps` if appropriate.
- SWR / React Query can be used for API handling.
- **Do NOT** use API Routes (`pages/api`), as the backend is already implemented.

---

### **1️⃣ API Request**  

- **Load the match list**  
  **Swagger:**  
  [API Documentation](https://drive.google.com/file/d/1p4Y9-8KL0eCQXh2HZoGgFRK05z_Vz62U/view?usp=sharing)  

- **Base URL:**  
  `https://app.ftoyd.com/fronttemp-service`

- **API Error Handling:**  
  If the server is unavailable, display the message:  
  `"Error: Failed to load information."`

---

### **2️⃣ UI (Figma)**  

- **Figma design:**  
  [Figma Prototype](https://www.figma.com/design/W16WfB86EgqtcuuqLCYjgF/Test-assignment?node-id=113-741&t=hBEv4NU9JHRNcUKm-4)

---

🚀 **Test Assignment 2**  
[Google Docs Task](https://docs.google.com/document/d/1SPVxcl7yV4TXZfRfQAnSHtUE_lfYgHiCtJSw28SkiKg/edit)  
[API Documentation](https://drive.google.com/file/d/1p4Y9-8KL0eCQXh2HZoGgFRK05z_Vz62U/view?usp=sharing)  
[Figma Design](https://www.figma.com/design/W16WfB86EgqtcuuqLCYjgF/Test-assignment?node-id=113-741&t=hBEv4NU9JHRNcUKm-4)



---
---
### **🚀 Test Assignment 2**  

Develop a **Match Tracker** web application using **React Native** that:  

- Loads a list of matches from an API.  
- Allows users to expand match details.  
- Displays team names, scores, match status, and a list of events.  
- Updates data in real-time using **WebSockets**.  
- Enables filtering of match events (e.g., **Live only** or **Finished only**).  
- Implements score change animation (e.g., smooth number increase on update).  
- Provides basic screen adaptation.  

---

💡 **Next.js is optional**. If you use Next.js:  

- You may use `getServerSideProps` or `getStaticProps` if appropriate.  
- SWR / React Query can be used for API handling.  
- **Do NOT** use API Routes (`pages/api`), as the backend is already implemented.  

---

### **1️⃣ API Request**  

- **Load the match list**  
  **Swagger Documentation:**  
  [API Documentation](https://drive.google.com/file/d/1p4Y9-8KL0eCQXh2HZoGgFRK05z_Vz62U/view?usp=sharing)  

- **Base URL:**  
  `https://app.ftoyd.com/fronttemp-service`  

- **API Error Handling:**  
  If the server is unavailable, display the message:  
  `"Error: Failed to load information."`  

- **Real-time Data Updates:**  
  `wss://app.ftoyd.com/fronttemp-service/ws`  

---

### **2️⃣ UI (Figma)**  

- **Figma Design:**  
  [Figma Prototype](https://www.figma.com/design/W16WfB86EgqtcuuqLCYjgF/Test-assignment?node-id=113-740&t=hBEv4NU9JHRNcUKm-4)


