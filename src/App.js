import Job from './Job.js'
import View from './View.js'
import Priority from './Priority.js'

const TIMEOUT = 1000
const PATTERN = /.+?:2B6[BC]:.+?:([0-9A-F]+?):/

export class App {
  me = null
  party = []
  gaols = []
  timeout = 0
  view = null
  priority = null

  constructor (app) {
    console.log('app loaded', this)

    this.bindListeners()
    window.startOverlayEvents()
    this.view = new View(app, (this.priority = new Priority()))
  }

  addOverlayListener (type) {
    window.addOverlayListener(type, this[`on${type}`].bind(this))
  }

  bindListeners () {
    this.addOverlayListener('LogLine')
    this.addOverlayListener('PartyChanged')
    this.addOverlayListener('ChangePrimaryPlayer')
  }

  onChangePrimaryPlayer ({ charID, charName }) {
    this.me = { name: charName, id: charID.toString(16) }
    this.view.update({ me: this.me })
  }

  onPartyChanged ({ party }) {
    this.party = party
      .map(p => p.inParty && { ...p, job: Job.fromCode(p.job) })
      .filter(p => p && p.job)
    
    this.view.update({ party: this.party })
  }

  onLogLine ({ line, rawLine }) {
    const m = PATTERN.exec(rawLine.replace(/\|/g, ':'))
    if (m) return this.onGaol(this.party.find(p => p.id === m[1]))
    if (line[0] === '00' && line[2] === '0038') return this.onEcho(line[4])
  }

  onEcho (text) {
    const m = text.split(' ')
    if (m[0] !== '돌감옥') return
    this.priority.setByNames(m.length > 1 && [...m[1]])
    this.view.update({ priority: this.priority })
  }

  onGaol (target) {
    if (!target) return
    if (Date.now() - this.timeout > TIMEOUT) this.gaols = []

    this.gaols.push(target)
    this.timeout = Date.now()
    if (this.gaols.length !== 3) return

    this.gaols = this.priority.calculate(this.gaols)
    this.view.update({ gaols: this.gaols })
  }
}