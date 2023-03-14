import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../interfaces/IQuestion';

@Pipe({
  standalone: true,
  name: 'sortQuestions',
})
export class SortQuestionsPipe implements PipeTransform {
  transform(questions: IQuestion[], sortBy: string): IQuestion[] {
    // console.log(`SortQuestionsPipe - sortBy: ${sortBy}`);
    if (!sortBy) {
      return questions;
    }

    switch (sortBy) {
      case 'Newest':
        return questions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'Oldest':
        return questions.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'Most Voted':
        return questions.sort(
          (a, b) => b.upvotes - a.upvotes - (b.downvotes - a.downvotes)
        );
      case 'Least Voted':
        return questions.sort(
          (a, b) => a.upvotes - b.upvotes - (a.downvotes - b.downvotes)
        );
      case 'Most Answered':
        return questions.sort((a, b) => b.answersCount - a.answersCount);
      case 'Unanswered':
        return questions.filter((question) => question.answersCount === 0);
      default:
        return questions;
    }
  }
}
