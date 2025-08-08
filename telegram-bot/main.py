import logging
import asyncio
import threading
from os import getenv
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler
import sqlite3

load_dotenv()

TOKEN_BOT = getenv("TOKEN")
BOT_PORT = int(getenv("PORT"))
BOT_HOST=getenv("HOST")

conn = sqlite3.connect("subscribers.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL
)
""")
conn.commit()

def add_subscriber(user_id: int):
    with sqlite3.connect("subscribers.db") as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO subscribers (user_id) VALUES (?)", (user_id,))
            conn.commit()
        except sqlite3.IntegrityError:
            print(f"user_id {user_id} уже существует.")

def remove_subscriber(user_id: int):
    with sqlite3.connect("subscribers.db") as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM subscribers WHERE user_id = ?", (user_id,))
        
        conn.commit()
def get_all_subscribers():
    with sqlite3.connect("subscribers.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM subscribers")
        return cursor.fetchall()

def is_user_subscribed(user_id: int) -> bool:
    with sqlite3.connect("subscribers.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1 FROM subscribers WHERE user_id = ?", (user_id,))
        return cursor.fetchone() is not None


logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

api_app = FastAPI()

telegram_app = ApplicationBuilder().token(TOKEN_BOT).build()

@api_app.post("/notify")
async def notify(request: Request):
    data = await request.json()
    video_url = data.get("video_title")
    video_title = data.get("video_title")
    video_user = data.get("video_user")
    video_url = data.get("video_url")

    for _, user_id in get_all_subscribers():
        try:
            await telegram_app.bot.send_message(chat_id=user_id, text=f"Новое видео: {video_url}")
            await telegram_app.bot.send_message(chat_id=user_id, parse_mode="HTML", text=f'''
                Новое видео на канале {video_user}
            {video_title}
            <a href={video_url}>Смотреть</a>
            ''')
        except Exception as e:
            logging.error(f"Ошибка отправки пользователю {user_id}: {e}")

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_chat.id
    if not is_user_subscribed(user_id):
        add_subscriber(user_id)
        await context.bot.send_message(chat_id=user_id, text=f"Привет, {update.effective_chat.first_name}! Ты теперь подписан на уведомления.")
        return
    await context.bot.send_message(chat_id=user_id, text=f"{update.effective_chat.first_name}, ты уже подписан на уведомления.")

async def unsubscribe(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_chat.id
    if is_user_subscribed(user_id):
        remove_subscriber(user_id)
        await context.bot.send_message(chat_id=user_id, text=f"{update.effective_chat.first_name}, ты успешно отписался от уведомлений. Чтобы   подписаться повторно просто пропишите /start")
        return
    await context.bot.send_message(chat_id=user_id, text=f"{update.effective_chat.first_name}, ты уже отписан от уведомлений.")

start_handler = CommandHandler("start", start)
unsubscribe_handler = CommandHandler("unsubscribe", unsubscribe)
telegram_app.add_handlers([start_handler, unsubscribe_handler])


def run_fastapi():
    import uvicorn
    uvicorn.run(api_app, host=BOT_HOST, port=BOT_PORT)

if __name__ == '__main__':
    threading.Thread(target=run_fastapi).start()
    telegram_app.run_polling()
    subscribers = get_all_subscribers()
conn.close()