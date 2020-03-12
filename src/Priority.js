import Job from './Job.js'

const FALLBACK = ['tank', 'melee', 'ranged', 'caster', 'healer']

export default class Priority {
  jobs = []

  constructor (names = '암전건나용사몽닌음기무흑솬적백점학') {
    const codes = JSON.parse(localStorage.getItem('priority'))
    this.set(codes ? this.setByCodes(codes) : this.setByNames(names))
  }

  setByCodes (codes) {
    this.set(codes.map(Job.fromCode))
  }

  setByNames (names) {
    this.set((typeof names === 'string' ? [...names] : names).map(Job.fromName))
  }

  set (jobs) {
    const list = Array.isArray(jobs) && jobs.filter(x => x)
    if (list && list.length > 1) {
      localStorage.setItem('priority',
        JSON.stringify((this.jobs = list).map(p => p.code)))
    }
  }

  toString (nameType = Job.NameTypes.KOREAN) {
    return this.jobs.map(p => p.getName(nameType)).join(', ')
  }

  getOrder (player, fallback = false) {
    return fallback
      ? FALLBACK.indexOf(player.job.role)
      : this.jobs.findIndex(job => job.code === player.job.code)
  }

  comparePlayers (a, b) {
    const [ai, bi] = [this.getOrder(a), this.getOrder(b)]

    if (ai > -1 && bi > -1) return ai - bi
    return this.getOrder(a, true) - this.getOrder(b, true)
  }

  calculate (gaols) {
    return gaols.slice().sort((a, b) => this.comparePlayers(a, b))
  }
}