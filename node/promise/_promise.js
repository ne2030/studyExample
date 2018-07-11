class _Promise {
    constructor(fn) {
        console.log('promise created!');
        this.state = 'pending';
        this.successFnc = null;
        this.errorFnc = null;
        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (err) {
            this.reject(err);
        }
    }

    resolve(data) {
        this.state = 'fulfilled';
        if (this.successFnc) {
            this.successFnc(data);
        }
    }

    reject(err) {
        this.state = 'rejected';
        this.error = err;
        if (this.errorFnc) {
            this.errorFnc(err);
        } else {
            throw new Error('unhandled promise rejection!!');
        }
    }

    then(successFnc, errorFnc) {
        [this.successFnc, this.errorFnc] = [successFnc, errorFnc];
        return this;
        try {
            if (this.state === 'fulfilled') {
                this.next = successFnc(this.next);
                return this;
            } else if (this.state === 'rejected' && errorFnc) {
                errorFnc(this.error);
                return this;
            }
            return this;
        } catch (err) {
            return this.reject(err);
        }
    }

    catch(errorFnc) {
        this.errorFnc = errorFnc;
        try {
            fn(this.error);
            return this;
        } catch (err) {
            return this.reject(err);
        }
    }
}

module.exports = _Promise;
