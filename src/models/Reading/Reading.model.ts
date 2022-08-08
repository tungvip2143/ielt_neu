import { isArray } from "lodash";
class MReading {
  _id?: string;
  skill?: string;
  level?: string;
  questionText?: string;
  answer?: any;
  explanationText?: string;
  groupId?: string;
  deleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  id?: string;

  constructor(data: any) {
    this._id = data?._id;
    this.skill = data?.skill;
    this.level = data?.level;
    this.questionText = data?.questionText;
    this.answer = data?.answer;
    this.explanationText = data?.explanationText;
    this.groupId = data?.groupId;
    this.deleted = data?.deleted;
    this.createdAt = data?.createdAt;
    this.updatedAt = data?.updatedAt;
    this.__v = data?.__v;
    this.id = data?.id;
  }

  static parseReadingListFromResponse(data: any) {
    if (isArray(data)) {
      return data.map((el) => new MReading(el));
    }

    return [];
  }
}

export default MReading;
