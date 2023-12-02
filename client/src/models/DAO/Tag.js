class Tag {
  #tid;
  #name;

  constructor(tid, name) {
    this.#tid = tid;
    this.#name = name;
  }

  clone() {
    return new Tag(
      this.#tid,
      this.#name
    );
  }

  get tid() {
    return this.#tid;
  }

  get name() {
    return this.#name;
  }
}

export default Tag;