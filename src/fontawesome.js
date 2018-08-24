import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faDice, faEnvelope, faKey} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

[faDice, faEnvelope, faKey].forEach(icon => library.add(icon))

Vue.component('font-awesome-icon', FontAwesomeIcon)
