import { Pipe, PipeTransform } from '@angular/core';
import { IQuestion } from '../interfaces/IQuestion';

@Pipe({
  standalone: true,
  name: 'filterQuestions',
})
export class FilterQuestionsPipe implements PipeTransform {
  transform(
    questions: IQuestion[],
    searchType: string | null | undefined,
    searchTerm: string | null | undefined
  ): IQuestion[] {
    console.log(
      `FilterQuestionsPipe - searchType: ${searchType}, searchTerm: ${searchTerm}`
    );

    if (!questions || !searchType || !searchTerm) {
      return questions;
    }

    searchTerm = searchTerm.toLowerCase();

    switch (searchType) {
      case 'Keyword':
        return questions.filter(
          (question) =>
            question.title.toLowerCase().includes(searchTerm!) ||
            question.description.toLowerCase().includes(searchTerm!) ||
            question.tags.some((tag) =>
              tag.name.toLowerCase().includes(searchTerm!)
            )
        );
      case 'User':
        return questions.filter((question) =>
          question.user.name.toLowerCase().includes(searchTerm!)
        );
      case 'Tag':
        return questions.filter((question) => {
          question.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchTerm!)
          );
        });
      default:
        return questions;
    }
  }
}
