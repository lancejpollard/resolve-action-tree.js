
module.exports = resolveDependencies

function resolveDependencies(events) {
  const graph = fetchDependencies(events)
  const stepKeys = chunkIntoSteps(graph)
  const steps = resolveStepsToEvents(graph, stepKeys)
  return steps
}

function fetchDependencies(events) {
  const graph = new Map

  events.forEach(event => {
    const node = event.output

    graph.set(node, {
      event,
      dependencies: new Set,
    })

    if (event.input) {
      Object.values(event.input).forEach(input => {
        if (input.type === 'binding') {
          const key = input.path[0]
          graph.get(node).dependencies.add(key)
        }
      })
    }
  })

  return graph
}

function chunkIntoSteps(graph) {
  const sources = fetchStartNodes(graph)

  let step = new Set(sources)
  let done = new Set(step)

  const keys = new Set(graph.keys())
  const todos = differenceSet(keys, done)

  const list = []

  while (step.size) {
    list.push([...step])

    // Next step is jobs that have all graph done
    const next = new Set

    // A clever data structure could find the next step in O(k log n)
    // for a step size of k and n jobs. This needs O(n).
    todos.forEach(todo => {
      const deps = graph.get(todo).dependencies
      if (isSubset([...deps], [...done])) {
        next.add(todo)
      }
    })

    // remove items that differ in both sets
    updateDifference(todos, next)
    done = new Set([...done, ...next])
    step = next
  }

  return list
}

function fetchStartNodes(graph) {
  const sources = new Set

  graph.forEach((node, key) => {
    if (!node.dependencies.size) {
      sources.add(key)
    }
  })

  return sources
}

function resolveStepsToEvents(graph, stepKeys) {
  const steps = []
  stepKeys.forEach(stepKeyList => {
    const events = []
    stepKeyList.forEach(key => {
      events.push(graph.get(key).event)
    })
    steps.push(Object.values(groupBy(events, 'group')))
  })
  return steps
}

function isSubset(a, ofB) {
  return a.every(val => ofB.includes(val));
}

function updateDifference(a, b) {
  for (let x of a) {
    z:
    for (let y of b) {
      if (x === y) {
        a.delete(x)
        break
      }
    }
  }
}

function differenceSet(setA, setB) {
  const diff = new Set(setA)
  for (let elem of setB) {
    diff.delete(elem)
  }
  return diff
}

function groupBy(array, key) {
  return array.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
