class Question {
  #qid;
  #title;
  #text;
  #tagIds;
  #askedBy;
  #askDate;
  #ansIds;
  #views;

  constructor(qid, title, text, tagIds, askedBy, askDate,ansIds = [], views = 0) {
    this.#qid = qid;
    this.#title = title;
    this.#text = text;
    this.#tagIds = tagIds;
    this.#askedBy = askedBy;
    this.#askDate = askDate;
    this.#ansIds = ansIds;
    this.#views = views;
  }

  clone() {
    return new Question(
      this.qid,
      this.title,
      this.text,
      this.tagIds,
      this.askedBy,
      new Date(this.askDate),
      this.ansIds,
      this.views
    );
  }

  get qid() {
    return this.#qid;
  }

  get title() {
    return this.#title;
  }

  get text() {
    return this.#text;
  }

  get tagIds() {
    return [...this.#tagIds];
  }

  get askedBy() {
    return this.#askedBy;
  }

  get askDate() {
    return new Date(this.#askDate);
  }

  get ansIds() {
    return [...this.#ansIds];
  }

  get views() {
    return this.#views;
  }

  updateAnswerId(aid){
    this.#ansIds.push(aid);
  }

  updateTagId(tid){
    this.#tagIds.push(tid);
  }

  incrementViewCount(){
    this.#views++;
  }
}

export default Question;