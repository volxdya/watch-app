import logging
import asyncio
import threading
from os import getenv
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler

load_dotenv()
TOKEN_BOT = getenv("TOKEN")

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

api_app = FastAPI()
subscribers = set()
subscribers.add(int(open('test-db.txt').readline()))

telegram_app = ApplicationBuilder().token(TOKEN_BOT).build()

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_chat.id
    subscribers.add(user_id)
    await context.bot.send_message(chat_id=user_id, text=f"Привет, {update.effective_chat.first_name}! Ты теперь подписан на уведомления.")

start_handler = CommandHandler("start", start)
telegram_app.add_handler(start_handler)

@api_app.post("/notify")
async def notify(request: Request):
    data = await request.json()
    video_title = data.get("video_title")
    video_user = data.get("video_user")
    video_url = data.get("video_url")

    for user_id in subscribers:
        try:
            await telegram_app.bot.send_message(chat_id=user_id, parse_mode="HTML", text=f'''
                Новое видео на канале {video_user}
            {video_title}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">Смотреть</a>
            ''')
        except Exception as e:
            logging.error(f"Ошибка отправки пользователю {user_id}: {e}")

    return {"status": "ok"}


def run_fastapi():
    import uvicorn
    uvicorn.run(api_app, host="0.0.0.0", port=8000)

if __name__ == '__main__':
    threading.Thread(target=run_fastapi).start()
    telegram_app.run_polling()