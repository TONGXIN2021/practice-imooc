let user = {
    name: 'tongxin',
    age: 22,
    _password: '***'
}

user = new Proxy(user, {
    get(target, prop) {
        if (prop.startsWith('_')) {
            throw new Error('不可访问')
        } else {
            return target[prop]
        }
    },

    set(target, prop, val) {
        if (prop.startsWith('_')) {
            throw new Error('不可访问')
        } else {
            target[prop] = val
            return true
        }
    },

    deleteProperty(target, prop) { //拦截删除
        if (prop.startsWith('_')) {
            throw new Error('不可删除')
        } else {
            delete target[prop]
            return true
        }
    },

    ownKeys(target) {//拦截遍历
        return Object.keys(target).filter(keys => !keys.startsWith('_'))
    }
})

//console.log(user.age)

//user.age = 18
//console.log(user.age)

/* 
try {
    user._password = 'XXX'
} catch (e) {
    console.log(e.message);
} */

/* 
try {
    //delete user.age
    delete user._password
} catch (e) {
    console.log(e.message);
} */

/* for (key in user) {
    console.log(key);
} */


//apply
let sum = (...args) => {
    let num = 0
    args.forEach(item => {
        num += item
    })
    return num
}

sum = new Proxy(sum, {
    apply(target, ctx, args) {
        return target(...args) * 2
    }
})

console.log(sum(4, 5));
console.log(sum.call(null, 1, 2, 3));
console.log(sum.apply(null, [1, 2, 3]))

//construct 拦截new命令
let User = class {
    constructor(name) {
        this.name = name
    }
}

User = new Proxy(User, {
    construct(target, args, newTarget) {
        console.log('construct 拦截');
        return new target(...args)
    }
})

console.log(new User('tongxin'));

