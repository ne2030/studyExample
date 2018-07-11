exports.updateCoupon = function (req, res) {
    co(function* () {
        try {
            const eventSeq = req.params.id;
            const param = req.body;

    // for EventParam
            const updateParam = {
                eventName: param.title || null,
                eventDesc: param.comment || null,
                eventStartDate: momentFormatter(param.startDate, 'YYYY-MM-DD'),
                eventEndDate: momentFormatter(param.endDate, 'YYYY-MM-DD'),
                eventStartTime: momentFormatter(param.startTime, 'HH:mm:ss'),
                eventEndTime: momentFormatter(param.endTime, 'HH:mm:ss'),
                companySeq: param.companySeq || null,
                isCoupon: param.isCoupon || null,
                isPrivate: (param.isPrivate && 1) || 0,
                status: param.status || null,
                regDate: moment().format('YYYY-MM-DD HH:mm:ss')
            };

            var momentFormatter = function (data, form) {
                if (data) { return moment(data).format(form); }
                return null;
            };

            yield coupon_model.db.updateEvent(updateParam, eventSeq);

            if (param.coupons && param.coupons.length > 0) {
                const couponParameter = param.coupons;

        // first loop - couponParameter
                for (let idx = 0; idx < couponParameter.length; idx++) {
                    var coupon = couponParameter[idx];
                    if (coupon.couponSeq) { yield updateCoupon(); } else { yield createCoupon(); }
                }

                var updateCoupon = function* () {
                    const couponSeq = coupon.couponSeq;
                    const updateCouponParam = {
                        couponName: coupon.couponName || null,
                        couponDesc: coupon.couponDesc || null,
                        couponStartDate: momentFormatter(coupon.couponStartDate, 'YYYY-MM-DD'),
                        couponEndDate: momentFormatter(coupon.couponEndDate, 'YYYY-MM-DD'),
                        couponStartTime: momentFormatter(coupon.couponStartTime, 'HH:mm:ss'),
                        couponEndTime: momentFormatter(coupon.couponEndTime, 'HH:mm:ss'),
                        exposureStartTime: momentFormatter(coupon.exposureStartTime, 'HH:mm:ss'),
                        exposureEndTime: momentFormatter(coupon.exposureEndTime, 'HH:mm:ss'),
                        couponTotalCount: coupon.couponTotalCount || null,
                        couponIssuanceCount: coupon.couponIssuanceCount || null,
                        couponType: coupon.couponType || null,
                        couponSubtypeSeq: coupon.couponSubtypeSeq || null,
                        couponStatusSeq: coupon.couponStatusSeq || null,
                        couponStatusValue: coupon.couponStatusValue || null,
                        couponStatusOption: coupon.couponStatusOption || null,
                        dayOfWeek: coupon.dayOfWeek || null
                    };

                    yield coupon_model.db.updateCoupon([updateCouponParam, couponSeq]);


                    const cif = yield coupon_model.db.getCouponCode({ couponSeq });
                    const cnt = coupon.couponTotalCount - cif[0].couponCount;
                    if (cnt > 0) {
                        const cpCrPm = {
                            couponSeq,
                            couponTotalCount: cnt,
                            keyword: param.keyword ? param.keyword : null,
                            isPrivate: param.isPrivate
                        };
                        yield createCouponCode(cpCrPm);
                    }
                };

                var createCoupon = function* () {
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
                    const rtn1 = coupon_model.db.initCoupon(couponParam);
                    const couponSeq = rtn1.insertId;
                    const cpCrPm = {
                        couponSeq,
                        couponTotalCount: coupon.couponTotalCount,
                        keyword: param.keyword ? param.keyword : null,
                        isPrivate: param.isPrivate
                    };

                    yield createCouponCode(cpCrPm);


                    for (let idx1 = 0; idx1 < coupon.couponPk.length; idx1++) {
                        const pkParam = coupon.couponPk[idx2];
                        const couponPkParam = [
                            null,
                            pkParam.parkinglotSeq,
                            couponSeq,
                            eventSeq,
                            pkParam.totalCount,
                            pkParam.maxDailyCount,
                            pkParam.ownedCouponCount || 0,
                            pkParam.usedCouponCount || 0,
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
                        const rtn2 = yield coupon_model.db.initCouponPark(couponPkParam);
                // 1차 이미지그룹 생성
                        const copSeq = rtn2.insertId;
                        yield _setImageGroup(pkParam.images, 'cop', copSeq);
                    }
                };

        // second loop - regPk
        // condition : couponSeq 0, copSeq 0
                const regPk = param.regPk || [];
                const addPk = param.addPk || [];

                for (var idx2 = 0; idx2 < regPk.length; idx2++) {
                    const udtParam = regPk[idx2];

            // Useless code
            // if(param.regPk.length==0){
            //     continue;
            // }

                    const updatePkParam = {
                        totalCount: udtParam.totalCount || null,
                        maxDailyCount: udtParam.maxDailyCount || null,
                        ownedCouponCount: udtParam.ownedCouponCount || null,
                        usedCouponCount: udtParam.usedCouponCount || null,
                        fixedPrice: udtParam.fixedPrice || null,
                        parkinglotManagerPhone: udtParam.parkinglotManagerPhone || null,
                        parkinglotManagerPhone1: udtParam.parkinglotManagerPhone1 || null,
                        parkinglotManagerPhone2: udtParam.parkinglotManagerPhone2 || null,
                        notice1: udtParam.notice1 || null,
                        notice2: udtParam.notice2 || null,
                        userSmsMsg: udtParam.userSmsMsg || null,
                    };

                    yield coupon_model.db.updateCouponPk([updatePkParam, udtParam.copSeq]);
            // 2차 이미지그룹 생성
                    copSeq = udtParam.copSeq;
                    yield _setImageGroup(udtParam.images, 'cop', copSeq);
                }

        // third loop - addPk
        // condition : couponSeq 0, copSeq X
                for (let idx3 = 0; idx3 < addPk.length; idx3++) {
                    const addCp = addPk[idx3];

            // Useless code
            // if(addPk.length==0){
            //     idx3++;
            // }

                    const couponPkParam = [
                        null,
                        addCp.parkinglotSeq,
                        addCp.couponSeq,
                        addCp.eventSeq,
                        addCp.totalCount,
                        addCp.maxDailyCount,
                        addCp.ownedCouponCount || 0,
                        addCp.usedCouponCount || 0,
                        addCp.fixedPrice,
                        addCp.parkinglotManagerPhone,
                        addCp.parkinglotManagerPhone1,
                        addCp.parkinglotManagerPhone2,
                        addCp.notice1,
                        addCp.notice2,
                        addCp.userSmsMsg,
                        moment().format('YYYY-MM-DD HH:mm:ss')
                    ];

                    const rtn = yield coupon_model.db.initCouponPark(couponPkParam);
            // 3차 이미지그룹 생성
                    var copSeq = rtn.insertId;
                    yield _setImageGroup(addCp.images, 'cop', copSeq);
                }
            }
            res.send({
                resultCode: defined.API_CODE_SUCCESS,
                result: null
            });
        } catch (err) {
            console.log(err.stack);
            res.send({
                resultCode: defined.API_CODE_ERROR,
                message: '오류가 발생했습니다. 다시 시도해주세요.'
            });
        }
    });
};
