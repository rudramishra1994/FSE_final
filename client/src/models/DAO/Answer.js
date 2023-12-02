class Answer {
  #aid;
  #text;
  #ansBy;
  #ansDate;

  constructor(aid, text, author, date) {
    this.#aid = aid;
    this.#text = text;
    this.#ansBy = author;
    this.#ansDate = date;
  }

  clone() {
    return new Answer(
      this.#aid,
      this.#text,
      this.#ansBy,
      new Date(this.#ansDate)
    );
  }

  get aid() {
    return this.#aid;
  }

  get text() {
    return this.#text;
  }

  get ansBy() {
    return this.#ansBy;
  }

  get ansDate() {
    return new Date(this.#ansDate);
  }
}

export default Answer;