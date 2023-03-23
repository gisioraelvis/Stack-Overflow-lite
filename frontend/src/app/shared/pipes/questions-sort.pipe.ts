import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../interfaces/IQuestion';

@Pipe({
  standalone: true,
  name: 'sortQuestions',
})
export class SortQuestionsPipe implements PipeTransform {
  transform(questions: IQuestion[], sortBy: string): IQuestion[] {
    if (!questions || questions.length === 0 || !sortBy) {
      return questions;
    }

    let sortedQuestions = [...questions];

    switch (sortBy) {
      case 'Newest':
        sortedQuestions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'Oldest':
        sortedQuestions.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'Most Voted':
        sortedQuestions.sort(
          (a, b) => b.upvotes - a.upvotes - (b.downvotes - a.downvotes)
        );
        break;
      case 'Least Voted':
        sortedQuestions.sort(
          (a, b) => a.upvotes - b.upvotes - (a.downvotes - b.downvotes)
        );
        break;
      case 'Most Answered':
        sortedQuestions.sort((a, b) => b.answersCount - a.answersCount);
        break;
      case 'Unanswered':
        sortedQuestions = sortedQuestions.filter(
          (question) => question.answersCount === 0
        );
        break;
      default:
        break;
    }

    return sortedQuestions;
  }
}
