import Job from './Job.js'

export default class Priority {
  priority = []

  constructor (names = [...'암전건나용사몽닌음기무흑솬적백점학']) {
    const codes = JSON.parse(localStorage.getItem('priority'))
    this.setPriority(codes ? this.setPriorityByCodes(codes) : this.setPriorityByNames(names))
  }

  setPriorityByNames (names) {
    return this.setPriority(names.map(Job.fromName).filter(x => x))
  }

  setPriorityByCodes (codes) {
    return this.setPriority(codes.map(Job.fromCode).filter(x => x))
  }

  setPriority (priority) {
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