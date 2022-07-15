export { default as CategoryIcon } from '../../components/CategoryIcon.vue'
export { default as ExcavationAgree } from '../../components/ExcavationAgree.vue'
export { default as ExcavationCard } from '../../components/ExcavationCard.vue'
export { default as ExcavationComments } from '../../components/ExcavationComments.vue'
export { default as ExcavationDetail } from '../../components/ExcavationDetail.vue'
export { default as ExcavationDetailParagraph } from '../../components/ExcavationDetailParagraph.vue'
export { default as ExcavationDetailTitle } from '../../components/ExcavationDetailTitle.vue'
export { default as FreeboardComments } from '../../components/FreeboardComments.vue'
export { default as LoginModal } from '../../components/LoginModal.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as SignUpModal } from '../../components/SignUpModal.vue'
export { default as SuggestAgree } from '../../components/SuggestAgree.vue'
export { default as SuggestCard } from '../../components/SuggestCard.vue'
export { default as SuggestComments } from '../../components/SuggestComments.vue'
export { default as SuggestDetail } from '../../components/SuggestDetail.vue'
export { default as SuggestDetailParagraph } from '../../components/SuggestDetailParagraph.vue'
export { default as SuggestDetailTitle } from '../../components/SuggestDetailTitle.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as SharedGlobalFooter } from '../../components/shared/GlobalFooter.vue'
export { default as SharedGlobalHeader } from '../../components/shared/GlobalHeader.vue'
export { default as SharedGlobalMain } from '../../components/shared/GlobalMain.vue'
export { default as SharedStatusBar } from '../../components/shared/StatusBar.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
