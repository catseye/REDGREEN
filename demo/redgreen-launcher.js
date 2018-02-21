function launch(prefix, container, config) {
  if (typeof container === 'string') {
    container = document.getElementById(container);
  }
  config = config || {};
  var deps = [
    "yoob/element-factory.js",
    "yoob/playfield.js",
    "yoob/playfield-html-view.js",
    "yoob/controller.js",
    "yoob/source-manager.js",
    "yoob/preset-manager.js",
    "../script/redgreen.js"
  ];
  var loaded = 0;
  var onload = function() {
    if (++loaded < deps.length) return;
    /* ----- launch, phase 1: create the UI ----- */
    var controlPanel = yoob.makeDiv(container);
    controlPanel.id = "panel_container";

    var subPanel = yoob.makeDiv(container);
    var selectConfiguration = yoob.makeSelect(subPanel, 'example configuration:', []);

    var displayContainer = yoob.makeDiv(container);
    displayContainer.id = 'display_container';

    var generationDisplay = yoob.makePre(displayContainer);
    generationDisplay.id = 'generation_display';

    var editor = yoob.makeTextArea(displayContainer, 40, 25);

    var generationView = new yoob.PlayfieldHTMLView().init({
      element: generationDisplay
    });

    // NOTE this is kind of chintzy, but, oh well
    generationView.draw = function() {
        this.element.innerHTML = this.pf.dump(dumpMapper);
    };

    /* ----- launch, phase 2: connect the controller ----- */
    var pf;
    var controller = (new yoob.Controller()).init({
      panelContainer: controlPanel,
      step: function() {
        var newPf = (new yoob.Playfield()).init({ defaultValue: 'Air' });
        evolve_playfield(pf, newPf);
        pf = newPf;
        generationView.setPlayfield(pf);
        generationView.draw();
      },
      reset: function(text) {
        pf = (new yoob.Playfield()).init({ defaultValue: 'Air' });
        pf.load(0, 0, text, loadMapper);
        generationView.setPlayfield(pf);
        generationView.draw();
      }
    });
    controller.clickStop();

    var sourceManager = (new yoob.SourceManager()).init({
      panelContainer: controlPanel,
      editor: editor,
      hideDuringEdit: [generationDisplay],
      disableDuringEdit: [controller.panel],
      storageKey: 'redgreen.alp',
      onDone: function() {
          controller.performReset(this.getEditorText());
      }
    });
    var p = (new yoob.PresetManager()).init({
      selectElem: selectConfiguration,
      controller: controller
    }).populateFromPairs(sourceManager, exampleConfigurations);
  };
  for (var i = 0; i < deps.length; i++) {
    var elem = document.createElement('script');
    elem.src = prefix + deps[i];
    elem.onload = onload;
    document.body.appendChild(elem);
  }
}
