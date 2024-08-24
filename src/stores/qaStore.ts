import { makeAutoObservable, runInAction } from "mobx";

interface Answer {
  content: string;
  isBest: boolean;
  username: string;
}


class QAStore {
  question: string;
  answers: Array<Answer>


  constructor() {
    makeAutoObservable(this);
  }

  setQuestion(question: string): void {
    runInAction(() => {
      this.question = question;
    })
  }

  setAnswers(answers: Array<Answer>): void {

    // There is a way to use decorators on the function
    // instead of using runInAction, but it's kinda a pita
    // to make work with tsconfig... maybe a problem
    // for another time.
    runInAction(() => {
      this.answers = answers;
    });
  }


}

export const qaStore = new QAStore();
