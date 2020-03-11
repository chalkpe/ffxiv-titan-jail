import Job from './Job.js'

export default class Priority {
  priority = []

  constructor (names = [...'암전건나용사몽닌음기무흑솬적백점학']) {
    const codes = JSON.parse(localStorage.getItem('priority'))
    this.set(codes ? this.setByCodes(codes) : this.setByNames(names))
  }

  setByNames (names) {
    return this.set(names.map(Job.fromName).filter(x => x))
  }

  setByCodes (codes) {
    return this.set(codes.map(Job.fromCode).filter(x => x))
  }

  set (priority) {
    if (priority && priority.length) {
      localStorage.setItem('priority',
        JSON.stringify((this.priority = priority).map(p => p.code)))
    }

    return this
  }

  toString (nameType = Job.NameTypes.KOREAN) {
    return this.priority.map(p => p.getName(nameType)).join(', ')
  }

  getOrder (player) {
    return this.priority.findIndex(p => p.code === player.job.code)
  }

  calculate (gaols) {
    return gaols.slice().sort((a, b) => this.getOrder(a) - this.getOrder(b))
  }
}