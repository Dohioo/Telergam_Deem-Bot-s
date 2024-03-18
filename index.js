require("dotenv").config();
const {
  Bot,
  GrammyError,
  HttpError,
  Keyboard,
  InlineKeyboard,
} = require("grammy");

const { hydrate } = require("@grammyjs/hydrate");

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

// ------------------------ //
// Подсказки и основные команды
bot.api.setMyCommands([
  {
    command: "start",
    description: "Приветствие",
  },
  {
    command: "mood",
    description: "Настроение",
  },
  {
    command: "share",
    description: "Поделиться для свата",
  },
  {
    command: "inline_keyboard",
    description: "Инлайн Клавиатура",
  },
  {
    command: "telegram",
    description: "Наш телеграмм",
  },
  {
    command: "menu",
    description: "Получить меню",
  },
]);
// Подсказки и основные команды
// ------------------------ //

// ------------------------ //
// Ответ на команду /start
bot.command("start", async (ctx) => {
  await ctx.react("👍");
  await ctx.reply(
    'Привет, я бот Dohi.  Подпишись на наш Telegram канал <a href="https://t.me/deemtme"> Дээм </a>',
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }
  );
});
// Ответ на команду /start
// ------------------------ //

// ------------------------ //
// Кастом клава с вопросами (настроение)
bot.command("mood", async (ctx) => {
  const moodKeyboard = new Keyboard()
    .text("Хорошо")
    .row()
    .text("Норм")
    .text("Плохо")
    .placeholder("Поделись настроением")
    .resized();
  await ctx.reply("Как настроение?", {
    reply_markup: moodKeyboard,
  });
});
// Кастом клава с вопросами (настроение)

// Ответы к вопросам (настроение)
bot.hears("Хорошо", async (ctx) => {
  await ctx.reply("Класс");
});
bot.hears("Норм", async (ctx) => {
  await ctx.reply("Отлично");
});
bot.hears("Плохо", async (ctx) => {
  await ctx.reply("Что случилось?");
});
// Ответы к вопросам (настроение)
// ------------------------ //

// ------------------------ //
// Геолокация Контакт Опрос
bot.command("share", async (ctx) => {
  const shareKeyboard = new Keyboard()
    .requestLocation("Геолокация")
    .requestContact("Контакт")
    .requestPoll("Опрос")
    .placeholder("Точно хочешь свата?")
    .resized();
  await ctx.reply("Чем поделишься чтобы тебя задоксили?", {
    reply_markup: shareKeyboard,
  });
});
// Геолокация Контакт Опрос

// Ответы к (Геолокация Контакт Опрос)
bot.on(":location", async (ctx) => {
  await ctx.reply("Спасибо за геолокацию, жди свата");
});
bot.on(":contact", async (ctx) => {
  await ctx.reply("Спасибо за контакт, теперь тебе точно пизда ^_^");
});
bot.on(":poll", async (ctx) => {
  await ctx.reply("Спасибо за созданный опрос");
});
// Ответы к (Геолокация Контакт Опрос)
// ------------------------ //

// ------------------------ //
// Выбор кнопок (1, 2, 3)
bot.command("inline_keyboard", async (ctx) => {
  const inlineKeyboard = new InlineKeyboard()
    .text("Подарок пасхалка", "button-1")
    .row()
    .text("Подарок на права", "button-2")
    .row()
    .text("Подарок на ориентацию", "button-3");

  await ctx.reply("Выберите цифру", {
    reply_markup: inlineKeyboard,
  });
});
// Выбор кнопок (button-1, button-2, button-3)

// Ответ на выбранную цыфру
bot.callbackQuery("button-1", async (ctx) => {
  await ctx.answerCallbackQuery("1488 ГИТЛЕР БЫЛ ПРАВ");
  await ctx.reply("1488 ПАСХАЛКА");
});
bot.callbackQuery("button-2", async (ctx) => {
  await ctx.answerCallbackQuery("1488 ГИТЛЕР БЫЛ ПРАВ");
  await ctx.reply("ГИТЛЕР БЫЛ ПРАВ");
});
bot.callbackQuery("button-3", async (ctx) => {
  await ctx.answerCallbackQuery("1488 ГИТЛЕР БЫЛ ПРАВ");
  await ctx.reply("ТЫ ГЕЙ");
});
// Ответ на выбранную цыфру
// ------------------------ //

// ------------------------ //
// Кнопка на Телеграмм
bot.command("telegram", async (ctx) => {
  const telergamKeyboard = new InlineKeyboard()
    .url("Перейти в тг-канал", "https://t.me/deemtme")
    .row();
  await ctx.reply("Нажмите кнопку", {
    reply_markup: telergamKeyboard,
  });
});
// Кнопка на Телеграмм
// ------------------------ //

// ------------------------ //
// Меню Support and Status
const menuKeyboard = new InlineKeyboard()
  .text("Узнать статус заказа", "order-status")
  .text("Обратиться в поддержку", "support");
const backKeyboard = new InlineKeyboard().text("<<Назад в меню.", "back");

bot.command("menu", async (ctx) => {
  await ctx.reply("Выберите пункт меню", {
    reply_markup: menuKeyboard,
  });
});
// Меню Support and Status
// ------------------------ //

// ------------------------ //
// Ответы на запросы  (Меню Support and Status)
bot.callbackQuery("order-status", async (ctx) => {
  await ctx.callbackQuery.message.editText("Статус заказ: в пути", {
    reply_markup: backKeyboard,
  });
  await ctx.answerCallbackQuery("Гитлер прав");
});

bot.callbackQuery("support", async (ctx) => {
  await ctx.callbackQuery.message.editText("Опишите ваш вопрос.", {
    reply_markup: backKeyboard,
  });
  await ctx.answerCallbackQuery("Гитлер прав");
});

bot.callbackQuery("back", async (ctx) => {
  await ctx.callbackQuery.message.editText("Выберите пункт меню", {
    reply_markup: menuKeyboard,
  });
  await ctx.answerCallbackQuery("Гитлер прав");
});
// Ответы на запросы  (Меню Support and Status)
// ------------------------ //

// ------------------------ //
//Ответы на ошибки чтобы не крашился бот
bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error white handling update ${ctx.update.update_id}`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error("Error in request", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});
//Ответы на ошибки чтобы не крашился бот
// ------------------------ //

bot.start();
