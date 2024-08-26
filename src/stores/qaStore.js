import { makeAutoObservable, ObservableMap, runInAction } from "mobx";

class QAStore {
  question = "";
  answers = [];
  threads = new ObservableMap();

  constructor() {
    makeAutoObservable(this);
  }

  setAnswers(answers) {
    // There is a way to use decorators on the function
    // instead of using runInAction, but it's kinda a PITA
    // to make work with tsconfig... maybe a problem
    // for another time.
    runInAction(() => {
      this.answers = answers;
    });

    // Set up the base object for each thread so we can add to it as
    // new responses come
    answers.forEach((ans, index) => {
      this.threads.set(index, [
        {
          role: "user",
          content: this.question,
        },
        {
          role: "assistant",
          content: ans.content,
        },
      ]);
    });
  }

  setQuestion(question) {
    runInAction(() => {
      this.question = question;
    });
  }

  addToThread(threadId, newMessage) {
    const currentValue = this.threads.get(threadId);

    if (!currentValue) {
      console.log("no thread found with id:", threadId);
      return;
    }

    this.threads.set(threadId, [...currentValue, newMessage]);
  }
}

export const qaStore = new QAStore();
