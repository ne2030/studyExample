exports.updateCoupon = function (req, res) {
    const eventSeq = req.params.id;
    const param = req.body;

    // for EventParam
    const updateParam = {};
    param.title ? updateParam.eventName = param.title : null;
    param.comment ? updateParam.eventDesc = param.comment : null;
    param.startDate ? updateParam.eventStartDate = moment(param.startDate).format('YYYY-MM-DD') : null;
    param.endDate ? updateParam.eventEndDate = moment(param.endDate).format('YYYY-MM-DD') : null;
    param.startTime ? updateParam.eventStartTime = moment(param.startTime).format('HH:mm:ss') : null;
    param.endTime ? updateParam.eventEndTime = moment(param.endTime).format('HH:mm:ss') : null;
    param.companySeq ? updateParam.companySeq = param.companySeq : null;
    param.isCoupon ? updateParam.isCoupon = param.isCoupon : null;
    updateParam.isPrivate = param.isPrivate ? 1 : 0;
    param.status ? updateParam.status = param.status : null;
    updateParam.regDate = moment().format('YYYY-MM-DD HH:mm:ss');

    coupon_model.db.updateEvent(updateParam, eventSeq)
        .then((rows) => {
            if (param.coupons && param.coupons.length > 0) {
                const couponParameter = param.coupons;
                let idx = 0;
                util.promiseLoop(() => { return idx < couponParameter.length; }, () => {
                    const deferred = promise.defer();

                    const coupon = couponParameter[idx];
                    if (coupon.couponSeq) {
                        // Update
                        const couponSeq = coupon.couponSeq;
                        const updateCouponParam = {};
                        coupon.couponName ? updateCouponParam.couponName = coupon.couponName : null;
                        coupon.couponDesc ? updateCouponParam.couponDesc = coupon.couponDesc : null;
                        coupon.couponStartDate ? updateCouponParam.couponStartDate = moment(coupon.couponStartDate).format('YYYY-MM-DD') : null;
                        coupon.couponEndDate ? updateCouponParam.couponEndDate = moment(coupon.couponEndDate).format('YYYY-MM-DD') : null;

                        coupon.couponStartTime ? updateCouponParam.couponStartTime = moment(coupon.couponStartTime).format('HH:mm:ss') : null;
                        coupon.couponEndTime ? updateCouponParam.couponEndTime = moment(coupon.couponEndTime).format('HH:mm:ss') : null;

                        coupon.exposureStartTime ? updateCouponParam.exposureStartTime = moment(coupon.exposureStartTime).format('HH:mm:ss') : null;
                        coupon.exposureEndTime ? updateCouponParam.exposureEndTime = moment(coupon.exposureEndTime).format('HH:mm:ss') : null;

                        coupon.couponTotalCount ? updateCouponParam.couponTotalCount = coupon.couponTotalCount : null;
                        coupon.couponIssuanceCount ? updateCouponParam.couponIssuanceCount = coupon.couponIssuanceCount : null;
                        coupon.couponType ? updateCouponParam.couponType = coupon.couponType : null;
                        coupon.couponSubtypeSeq ? updateCouponParam.couponSubtypeSeq = coupon.couponSubtypeSeq : null;
                        coupon.couponStatusSeq ? updateCouponParam.couponStatusSeq = coupon.couponStatusSeq : null;
                        coupon.couponStatusValue ? updateCouponParam.couponStatusValue = coupon.couponStatusValue : null;
                        coupon.couponStatusOption ? updateCouponParam.couponStatusOption = coupon.couponStatusOption : null;
                        coupon.dayOfWeek ? updateCouponParam.dayOfWeek = coupon.dayOfWeek : null;

                        coupon_model.db.updateCoupon([updateCouponParam, couponSeq])
                            .then((rtn) => {
                                idx++;
                                coupon_model.db.getCouponCode({ couponSeq })
                                    .then((cif) => {
                                        const cnt = coupon.couponTotalCount - cif[0].couponCount;
                                        if (cnt > 0) {
                                            const cpCrPm = {
                                                couponSeq,
                                                couponTotalCount: cnt,
                                                keyword: param.keyword ? param.keyword : null,
                                                isPrivate: param.isPrivate
                                            };
                                            createCouponCode(cpCrPm)
                                                .then(() => {
                                                    deferred.resolve(true);
                                                });
                                        } else {
                                            deferred.resolve(true);
                                        }
                                    }, (err) => {
                                        deferred.reject();
                                    });
                            });
                    } else {
                        // Create
                        const couponParam = [
                            null,
                            eventSeq,
                            coupon.couponName,
                            coupon.couponDesc,
                            moment(coupon.couponStartDate).format('YYYY-MM-DD'),
                            moment(coupon.couponEndDate).format('YYYY-MM-DD'),
                            moment(coupon.couponStartTime).format('HH:mm:ss'),
                            moment(coupon.couponEndTime).format('HH:mm:ss'),
                            moment(coupon.exposureStartTime).format('HH:mm:ss'),
                            moment(coupon.exposureEndTime).format('HH:mm:ss'),
                            coupon.couponTotalCount,
                            coupon.couponIssuanceCount ? coupon.couponIssuanceCount : 0,
                            null,
                            moment().format('YYYY-MM-DD HH:mm:ss'),
                            coupon.couponType,
                            coupon.couponSubtypeSeq,
                            coupon.couponStatusSeq,
                            coupon.couponStatusValue,
                            coupon.couponStatusOption ? coupon.couponStatusOption : null,
                            coupon.dayOfWeek ? coupon.dayOfWeek : ''
                        ];

                        coupon_model.db.initCoupon(couponParam)
                            .then((rtn2) => {
                                const couponSeq = rtn2.insertId;
                                const cpCrPm = {
                                    couponSeq,
                                    couponTotalCount: coupon.couponTotalCount,
                                    keyword: param.keyword ? param.keyword : null,
                                    isPrivate: param.isPrivate
                                };

                                createCouponCode(cpCrPm)
                                    .then((ctn) => {
                                        let idx2 = 0;
                                        util.promiseLoop(() => { return idx2 < coupon.couponPk.length; }, () => {
                                            const df2 = promise.defer();
                                            const pkParam = coupon.couponPk[idx2];
                                            const couponPkParam = [
                                                null,
                                                pkParam.parkinglotSeq,
                                                couponSeq,
                                                eventSeq,
                                                pkParam.totalCount,
                                                pkParam.maxDailyCount,
                                                pkParam.ownedCouponCount ? pkParam.ownedCouponCount : 0,
                                                pkParam.usedCouponCount ? pkParam.usedCouponCount : 0,
                                                pkParam.fixedPrice,
                                                pkParam.parkinglotManagerPhone,
                                                pkParam.parkinglotManagerPhone1,
                                                pkParam.parkinglotManagerPhone2,
                                                pkParam.notice1,
                                                pkParam.notice2,
                                                pkParam.userSmsMsg,
                                                moment().format('YYYY-MM-DD HH:mm:ss')
                                            ];
                                            // condition : couponSeq X, copSeq X
                                            coupon_model.db.initCouponPark(couponPkParam)
                                                .then((rtn2) => {
                                                    // 1차 이미지그룹 생성
                                                    const copSeq = rtn2.insertId;
                                                    _setImageGroup(pkParam.images, 'cop', copSeq)
                                                        .then(() => {
                                                            idx2++;
                                                            df2.resolve({ result: true });
                                                        }, () => {
                                                            res.send({
                                                                resultCode: defined.API_CODE_ERROR,
                                                                message: '오류가 발생했습니다. 다시 시도해주세요.'
                                                            });
                                                        });
                                                }, (err) => {
                                                    df2.reject();
                                                    res.send({
                                                        resultCode: defined.API_CODE_ERROR,
                                                        message: '오류가 발생했습니다. 다시 시도해주세요.'
                                                    });
                                                });
                                            return df2.promise;
                                        }).then(() => {
                                            idx++;
                                            deferred.resolve({ result: true });
                                        });
                                    });
                            }, (err) => {
                                res.send({
                                    resultCode: defined.API_CODE_ERROR,
                                    message: '오류가 발생했습니다. 다시 시도해주세요.'
                                });
                            });
                    }


                    return deferred.promise;
                }).then(() => {
                    let idx1 = 0;

                    // condition : couponSeq 0, copSeq 0
                    param.regPk = param.regPk ? param.regPk : [];
                    param.addPk = param.addPk ? param.addPk : [];
                    util.promiseLoop(() => { return idx1 < param.regPk.length; }, () => {
                        const udtParam = param.regPk[idx1];
                        const deferred = promise.defer();

                        if (param.regPk.length == 0) {
                            idx1++;
                            deferred.resolve(true);
                        }

                        const updatePkParam = {};
                        udtParam.totalCount ? updatePkParam.totalCount = udtParam.totalCount : null;
                        udtParam.maxDailyCount ? updatePkParam.maxDailyCount = udtParam.maxDailyCount : null;
                        udtParam.ownedCouponCount ? updatePkParam.ownedCouponCount = udtParam.ownedCouponCount : null;
                        udtParam.usedCouponCount ? updatePkParam.usedCouponCount = udtParam.usedCouponCount : null;
                        udtParam.fixedPrice ? updatePkParam.fixedPrice = udtParam.fixedPrice : null;
                        udtParam.parkinglotManagerPhone ? updatePkParam.parkinglotManagerPhone = udtParam.parkinglotManagerPhone : null;
                        udtParam.parkinglotManagerPhone1 ? updatePkParam.parkinglotManagerPhone1 = udtParam.parkinglotManagerPhone1 : null;
                        udtParam.parkinglotManagerPhone2 ? updatePkParam.parkinglotManagerPhone2 = udtParam.parkinglotManagerPhone2 : null;
                        udtParam.notice1 ? updatePkParam.notice1 = udtParam.notice1 : null;
                        udtParam.notice2 ? updatePkParam.notice2 = udtParam.notice2 : null;
                        udtParam.userSmsMsg ? updatePkParam.userSmsMsg = udtParam.userSmsMsg : null;

                        coupon_model.db.updateCouponPk([updatePkParam, udtParam.copSeq])
                            .then((rtn) => {
                                // 2차 이미지그룹 생성
                                const copSeq = udtParam.copSeq;
                                _setImageGroup(udtParam.images, 'cop', copSeq)
                                    .then(() => {
                                        idx1++;
                                        deferred.resolve(true);
                                    }, () => {
                                        res.send({
                                            resultCode: defined.API_CODE_ERROR,
                                            message: '오류가 발생했습니다. 다시 시도해주세요.'
                                        });
                                    });
                            }, () => {
                                res.send({
                                    resultCode: defined.API_CODE_ERROR,
                                    message: '오류가 발생했습니다. 다시 시도해주세요.'
                                });
                            });
                        return deferred.promise;
                    }).then(() => {
                        let idx2 = 0;
                        // condition : couponSeq 0, copSeq X
                        util.promiseLoop(() => { return idx2 < param.addPk.length; }, () => {
                            const deferred = promise.defer();
                            const addCp = param.addPk[idx2];

                            if (param.addPk.length == 0) {
                                idx2++;
                                deferred.resolve(true);
                            }

                            const couponPkParam = [
                                null,
                                addCp.parkinglotSeq,
                                addCp.couponSeq,
                                addCp.eventSeq,
                                addCp.totalCount,
                                addCp.maxDailyCount,
                                addCp.ownedCouponCount ? addCp.ownedCouponCount : 0,
                                addCp.usedCouponCount ? addCp.usedCouponCount : 0,
                                addCp.fixedPrice,
                                addCp.parkinglotManagerPhone,
                                addCp.parkinglotManagerPhone1,
                                addCp.parkinglotManagerPhone2,
                                addCp.notice1,
                                addCp.notice2,
                                addCp.userSmsMsg,
                                moment().format('YYYY-MM-DD HH:mm:ss')
                            ];

                            coupon_model.db.initCouponPark(couponPkParam)
                                .then((rtn) => {
                                    // 3차 이미지그룹 생성
                                    const copSeq = rtn.insertId;
                                    _setImageGroup(addCp.images, 'cop', copSeq)
                                        .then(() => {
                                            idx2++;
                                            deferred.resolve({ result: true });
                                        }, () => {
                                            res.send({
                                                resultCode: defined.API_CODE_ERROR,
                                                message: '오류가 발생했습니다. 다시 시도해주세요.'
                                            });
                                        });
                                }, () => {
                                    res.send({
                                        resultCode: defined.API_CODE_ERROR,
                                        message: '오류가 발생했습니다. 다시 시도해주세요.'
                                    });
                                });
                            return deferred.promise;
                        }).then(() => {
                            res.send({
                                resultCode: defined.API_CODE_SUCCESS,
                                result: null
                            });
                        });
                    });
                });
            } else {
                res.send({
                    resultCode: defined.API_CODE_SUCCESS,
                    result: null
                });
            }
        }, (err) => {
            res.send({
                resultCode: defined.API_CODE_ERROR,
                message: '오류가 발생했습니다. 다시 시도해주세요.'
            });
        });
};
