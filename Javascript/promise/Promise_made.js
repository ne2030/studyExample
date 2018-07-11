class _Promise {
    constructor(fn) {
        this.state = 'pending';
        try {
            fn(this.resolve, this.reject);
        } catch (err) {
            this.reject(err);
        }
    }

    resolve(data) {
        this.state = 'fulfilled';
        this.next = data;
        return this;
    }

    reject(err) {
        this.state = 'rejected';
        this.error = err;
        return this;
    }

    then(successFnc, errorFnc) {
        if (this.state === 'fulfilled') {
            this.next = successFnc(this.next);
            return this;
        } else if (this.state === 'rejected') {
            errorFnc(this.error);
            return this;
        }
    }
}
