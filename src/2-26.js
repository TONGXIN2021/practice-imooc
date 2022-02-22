let course = {
    allCourse: {
        frontend: ['es', 'vue', 'react'],
        backend: ['java', 'sql', 'python'],
        webapp: ['Andriod', 'ios']
    }
}

/* course[Symbol.iterator] = function () {
    let allCourse = this.allCourse
    let keys = Reflect.ownKeys(allCourse)
    let values = []
    return {
        next() {
            if (!values.length) {
                if (keys.length) {
                    values = allCourse[keys[0]]
                    keys.shift()
                }
            }
            console.log(values);
            return {
                done: !values.length,
                value: values.shift()
            }
        }
    }

}

for (let c of course) {
    console.log(c);
} */

course[Symbol.iterator] = function* () {
    let allCourse = this.allCourse
    let keys = Reflect.ownKeys(allCourse)
    let value = []
    while (1) {
        if (!value.length) {
            if (keys.length) {
                value = allCourse[keys[0]]
                keys.shift()
                yield value.shift()
            } else {
                return false
            }
        } else {
            yield value.shift()
        }
    }
}

for (let c of course) {
    console.log(c);
}