define(['material', 'cards/node', 'jquery'], function (mdc, Node) {
  class LoopNode extends Node {
    editBody () {
      let body = '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">'
      body += '  <label class="mdc-text-field mdc-text-field--outlined" id="' + this.cardId + '_iterations_field" style="width: 100%">'
      body += '    <span class="mdc-notched-outline">'
      body += '      <span class="mdc-notched-outline__leading"></span>'
      body += '      <div class="mdc-notched-outline__notch">'
      body += '        <label for="' + this.cardId + '_iterations_value" class="mdc-floating-label">Iterations</label>'
      body += '      </div>'
      body += '      <span class="mdc-notched-outline__trailing"></span>'
      body += '    </span>'
      body += '    <span class="mdc-text-field__resizer">'
      body += '      <input type="number" min="0" step="1" id="' + this.cardId + '_iterations_value" class="mdc-text-field__input">'
      body += '    </span>'
      body += '  </label>'
      body += '</div>'
      body += '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-7 mdc-typography--body1" style="padding-top: 24px;">'
      body += '  Loop Action:'
      body += '</div>'
      body += '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-5" style="padding-top: 8px; text-align: right;">'
      body += '  <button class="mdc-icon-button" id="' + this.cardId + '_loop_edit">'
      body += '    <i class="material-icons mdc-icon-button__icon" aria-hidden="true">create</i>'
      body += '  </button>'
      body += '  <button class="mdc-icon-button" id="' + this.cardId + '_loop_goto">'
      body += '    <i class="material-icons mdc-icon-button__icon" aria-hidden="true">navigate_next</i>'
      body += '  </button>'
      body += '</div>'
      body += '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-7 mdc-typography--body1" style="padding-top: 24px;">'
      body += '  Exit Action:'
      body += '</div>'
      body += '<div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-5" style="padding-top: 8px; text-align: right;">'
      body += '  <button class="mdc-icon-button" id="' + this.cardId + '_next_edit">'
      body += '    <i class="material-icons mdc-icon-button__icon" aria-hidden="true">create</i>'
      body += '  </button>'
      body += '  <button class="mdc-icon-button" id="' + this.cardId + '_next_goto">'
      body += '    <i class="material-icons mdc-icon-button__icon" aria-hidden="true">navigate_next</i>'
      body += '  </button>'
      body += '</div>'
      body += '<div class="mdc-dialog" role="alertdialog" aria-modal="true" id="' + this.cardId + '-edit-dialog"  aria-labelledby="' + this.cardId + '-dialog-title" aria-describedby="' + this.cardId + '-dialog-content">'
      body += '  <div class="mdc-dialog__container">'
      body += '    <div class="mdc-dialog__surface">'
      body += '      <h2 class="mdc-dialog__title" id="' + this.cardId + '-dialog-title">Choose Destination</h2>'
      body += '      <div class="mdc-dialog__content" id="' + this.cardId + '-dialog-content"  style="padding: 0px;">'

      body += this.dialog.chooseDestinationMenu(this.cardId)

      body += '      </div>'
      body += '    </div>'
      body += '  </div>'
      body += '  <div class="mdc-dialog__scrim"></div>'
      body += '</div>'

      return body
    }

    viewBody () {
      return '<div class="mdc-typography--body1" style="margin: 16px;">Loops: <em>' + this.definition.iterations + ' time(s).</em></div>'
    }

    initialize () {
      super.initialize()

      const me = this

      const iterationsField = mdc.textField.MDCTextField.attachTo(document.getElementById(this.cardId + '_iterations_field'))
      iterationsField.value = '' + this.definition.iterations

      $('#' + this.cardId + '_iterations_value').on('change keyup paste', function () {
        const value = $('#' + me.cardId + '_iterations_value').val()

        me.definition.iterations = parseInt(value)

        me.dialog.markChanged(me.id)
      })

      me.dialog.initializeDestinationMenu(me.cardId, function (selected) {
        if (me.targetAction === 'loop') {
          me.definition.loop_id = selected
        } else {
          me.definition.next_id = selected
        }

        me.dialog.markChanged(me.id)
        me.dialog.loadNode(me.definition)
      })

      const dialog = mdc.dialog.MDCDialog.attachTo(document.getElementById(me.cardId + '-edit-dialog'))

      $('#' + this.cardId + '_loop_edit').on('click', function () {
        me.targetAction = 'loop'

        dialog.open()
      })

      $('#' + this.cardId + '_loop_goto').on('click', function () {
        const destinationNodes = me.destinationNodes(me.dialog)

        for (let i = 0; i < destinationNodes.length; i++) {
          const destinationNode = destinationNodes[i]

          if (me.definition.loop_id === destinationNode.id) {
            $("[data-node-id='" + destinationNode.id + "']").css('background-color', '#ffffff')
          } else {
            $("[data-node-id='" + destinationNode.id + "']").css('background-color', '#e0e0e0')
          }
        }

        const sourceNodes = me.sourceNodes(me.dialog)

        for (let i = 0; i < sourceNodes.length; i++) {
          const sourceNode = sourceNodes[i]

          if (me.definition.loop_id === sourceNode.id) {
            $("[data-node-id='" + sourceNode.id + "']").css('background-color', '#ffffff')
          } else {
            $("[data-node-id='" + sourceNode.id + "']").css('background-color', '#e0e0e0')
          }
        }
      })

      $('#' + this.cardId + '_next_edit').on('click', function () {
        me.targetAction = 'next'

        dialog.open()
      })

      $('#' + this.cardId + '_next_goto').on('click', function () {
        const destinationNodes = me.destinationNodes(me.dialog)

        for (let i = 0; i < destinationNodes.length; i++) {
          const destinationNode = destinationNodes[i]

          if (me.definition.next_id === destinationNode.id) {
            $("[data-node-id='" + destinationNode.id + "']").css('background-color', '#ffffff')
          } else {
            $("[data-node-id='" + destinationNode.id + "']").css('background-color', '#e0e0e0')
          }
        }

        const sourceNodes = me.sourceNodes(me.dialog)

        for (let i = 0; i < sourceNodes.length; i++) {
          const sourceNode = sourceNodes[i]

          if (me.definition.next_id === sourceNode.id) {
            $("[data-node-id='" + sourceNode.id + "']").css('background-color', '#ffffff')
          } else {
            $("[data-node-id='" + sourceNode.id + "']").css('background-color', '#e0e0e0')
          }
        }
      })
    }

    destinationNodes (dialog) {
      const nodes = super.destinationNodes(dialog)

      const loopId = this.definition.loop_id

      for (let i = 0; i < this.dialog.definition.length; i++) {
        const item = this.dialog.definition[i]

        if (item.id === loopId) {
          nodes.push(Node.createCard(item, dialog))
        }
      }

      const nextId = this.definition.next_id

      for (let i = 0; i < this.dialog.definition.length; i++) {
        const item = this.dialog.definition[i]

        if (item.id === nextId) {
          nodes.push(Node.createCard(item, dialog))
        }
      }

      if (nodes.length === 0) {
        const node = this.dialog.resolveNode(nextId)

        if (node !== null) {
          nodes.push(node)
        }
      }

      return nodes
    }

    updateReferences (oldId, newId) {
      if (this.definition.next_id === oldId) {
        this.definition.next_id = newId
      }

      if (this.definition.loop_id === oldId) {
        this.definition.loop_id = newId
      }
    }

    issues () {
      const issues = super.issues()

      if (this.definition.next_id === this.definition.id) {
        issues.push([this.definition.id, 'Exit node points to self.', this.definition.name])
      }

      if (this.definition.next_id === undefined) {
        issues.push([this.definition.id, 'Exit node does not point to another node.', this.definition.name])
      } else {
        if (this.isValidDestination(this.definition.next_id) === false) {
          issues.push([this.definition.id, 'Exit node points to a non-existent node.', this.definition.name])
        }
      }

      if (this.definition.loop_id === this.definition.id) {
        issues.push([this.definition.id, 'Loop node points to self.', this.definition.name])
      }

      if (this.definition.loop_id === undefined) {
        issues.push([this.definition.id, 'Loop node does not point to another node.', this.definition.name])
      } else {
        if (this.isValidDestination(this.definition.loop_id) === false) {
          issues.push([this.definition.id, 'Loop node points to a non-existent node.', this.definition.name])
        }
      }

      return issues
    }

    cardType () {
      return 'Loop'
    }

    static cardName () {
      return 'Loop'
    }

    static createCard (cardName) {
      const card = {
        name: cardName,
        context: '(Context goes here...)',
        type: 'loop',
        id: Node.uuidv4(),
        next_id: null,
        iterations: 5,
        loop_id: null
      }

      return card
    }
  }

  Node.registerCard('loop', LoopNode)

  return LoopNode
})
