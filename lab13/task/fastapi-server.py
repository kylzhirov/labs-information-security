from typing import Annotated


from fastapi import FastAPI, Form


app = FastAPI()

@app.post("/save")
def save(
    input: Annotated[str, Form()],
):
    try:
        with open("log.txt", "a", encoding="utf-8") as f:
            f.write(input + "\n")
        return {"message": "Input saved successfully"}
    except Exception as e:
        return {"error": f"Failed to save input: {str(e)}"}
