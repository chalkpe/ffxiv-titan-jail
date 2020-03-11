import Job from './Job.js'
import Priority from './Priority.js'

const say = opts => {
  if (typeof opts === 'string') {
    return say({ text: opts, lang: 'ko', speed: 0.6 })
  }
  const params = new URLSearchParams(opts)
  return new Audio('https://www.google.com/speech-api/v1/synthesize?' + params).play()
}

const tiles = {}
const app = document.getElementById('app')

const clearTiles = () => {
  while (app.hasChildNodes()) app.removeChild(app.firstChild)
}

const getTile = name => {
  if (name instanceof Job) {
    return getTile(name.getName(Job.NameTypes.XIVAPI))
  }

  if (tiles[name]) return tiles[name]
  const url = `https://raw.githubusercontent.com/xivapi/classjob-icons/master/companion/${name}.png`

  return new Promise(resolve => {
    const img = document.createElement('img')
    img.setAttribute('src', url)
    img.setAttribute('width', '32')
    img.setAttribute('height', '32')
    img.addEventListener('load', () => resolve((tiles[name] = img)))
  })
}

const preloadTiles = async () => {
  app.appendChild(await getTile('none'))
  await Promise.all(Job.instances.map(getTile))
} 

class TitanJail {
  me = null
  party = []
  gaols = []
  timeout = 0
  priority = null
  sayType = Job.NameTypes.KOREAN_SHORT

  constructor () {
    preloadTiles()
    this.sayPriority()
    this.bindListeners()
    console.log('TitanJail loaded', this)
  }

  addOverlayListener (type) {
    window.addOverlayListener(type, this[`on${type}`].bind(this))
  }

  bindListeners () {
    this.addOverlayListener('LogLine')
    this.addOverlayListener('PartyChanged')
    this.addOverlayListener('ChangePrimaryPlayer')
    window.startOverlayEvents()
  }

  onChangePrimaryPlayer ({ charID, charName }) {
    this.me = { name: charName, id: charID.toString(16) }
  }

  onPartyChanged ({ party }) {
    this.party = party
      .map(p => p.inParty && { ...p, job: Job.fromCode(p.job) })
      .filter(p => p && p.job)
  }

  onLogLine ({ line, rawLine }) {
    const m = TitanJail.PATTERN.exec(rawLine.replace(/\|/g, ':'))
    if (m) return this.onGaol(this.party.find(p => p.id === m[1]))
    if (line[0] === '00' && line[2] === '0038') return this.onEcho(line[4])
  }

  onEcho (message) {
    const m = message.split(' ')
    if (m[0] === '돌감옥') {
      this.priority.setPrioryByNames(m.length > 1 && [...m[1]])
      this.sayPriority()
    }
  }

  sayPriority () {
    this.priority = this.priority || new Priority()
    say(`현재 설정된 돌감옥 우선순위는 ${this.priority}입니다.`)
  }

  onGaol (target) {
    if (!target) return
    if (Date.now() - this.timeout > TitanJail.TIMEOUT) this.gaols = []

    this.gaols.push(target)
    this.timeout = Date.now()
    if (this.gaols.length !== 3) return

    this.gaols = this.priority.calculate(this.gaols)
    const order = 1 + this.gaols.findIndex(p => p.id === this.me.id)
    say(order ? `${order}번째` : this.gaols.map(p => p.job.getName(sayType)).join(' '))
    
    clearTiles()
    this.gaols.forEach(p => app.appendChild(getTile(p.job)))
  }
}

TitanJail.TIMEOUT = 1000
TitanJail.PATTERN = /.+?:2B6[BC]:.+?:([0-9A-F]+?):/

export default TitanJail