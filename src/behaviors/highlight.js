import {select, event} from 'd3-selection'
import 'd3-transition'

export function registerHighlight (track, instance, element, trackParams) {
  track.dispatch.on('mouseover.highlight', (d) => {
    instance.svg.selectAll("path.chord").attr("opacity", 0.1)
    instance.svg.selectAll(
      "g.cs-layout").selectAll("g").attr("opacity", 0.1)
    if (d.source){
      // User has moused over a chord
      instance.svg.selectAll(
      "path.chord[data-source='"+d.source.id+"'][data-target='"+d.target.id+"']"
      ).attr("opacity", 0.7)

      instance.svg.selectAll(
        "g.cs-layout").selectAll(
          "g[data-id='"+d.source.id+"']").attr("opacity", 1)
      instance.svg.selectAll(
        "g.cs-layout").selectAll(
          "g[data-id='"+d.target.id+"']").attr("opacity", 1)

      /*instance.svg.selectAll("path.chord").sort(
        // Order this chord last so it appears on top
        function (a, b) {
          if (a.source.id == d.source.id && a.target.id == d.target.id){
            return 1
          }
          else return -1
        })*/
    }
    if(d.block_id){
      // For layout arcs, highlight all incoming or outgoing chords
      instance.svg.selectAll(
        "path.chord[data-source='"+d.block_id+"']").attr("opacity", 0.7)
      instance.svg.selectAll(
        "path.chord[data-target='"+d.block_id+"']").attr("opacity", 0.7)
      // blocks
      instance.svg.selectAll(
        "g.cs-layout").selectAll(
          "g[data-id='"+d.block_id+"']").attr("opacity", 1)
      // linked blocks
       instance.svg.selectAll(
         "path.chord[data-target='"+d.block_id+"']").each(function(dsub,i){
           instance.svg.selectAll(
             "g.cs-layout").selectAll(
               "g[data-id='"+dsub.source.id+"']").attr("opacity", 0.7)
         })
      instance.svg.selectAll(
        "path.chord[data-source='"+d.block_id+"']").each(function(dsub,i){
          instance.svg.selectAll(
            "g.cs-layout").selectAll(
              "g[data-id='"+dsub.target.id+"']").attr("opacity", 0.7)
         })
      /*instance.svg.selectAll("path.chord").sort(
        // Put these chords on top
        function (a, b) {
          if (a.source.id == d.block_id || a.target.id == d.block_id){
            return 1
          }
          else return -1
        })*/
    }
  })

  track.dispatch.on('mouseout.highlight', (d) => {
    instance.svg.selectAll("path.chord").attr("opacity", 0.7)
    instance.svg.selectAll(
        "g.cs-layout").selectAll("g").attr("opacity", 1)
  })
}
