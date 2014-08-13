'use strict';

angular.module('maisonApp', [
    , 'ngRoute'
    , 'ngAnimate'
    , 'ui.bootstrap'
    , 'angularFileUpload'
    , 'loginModule'
]);

angular.module('maisonApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/views/1000-Main/050-1000-main.html',
                controller: 'mainCtrl'
            })
            .when('/home', {
                redirectTo: '/'
            })
            .when('/introduction', {
                templateUrl: '/views/1100-introduction/050-1100-introduction.html'
            //  ,controller: 'Somewhat Controller'
            })
            .when('/organization', {
                templateUrl: '/views/1200-organization/050-1200-organization.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio1', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio1.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio2', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio2.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio3', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio3.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio4', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio4.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio5', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio5.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio6', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio6.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio7', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio7.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio8', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio8.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio9', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio9.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio10', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio10.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio11', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio11.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/portfolio12', {
                templateUrl: '/views/1300-portfolio/050-1300-portfolio12.html'
                //  ,controller: 'Somewhat Controller'
            })

            .when('/requestWrite', {
                templateUrl: '/views/1400-request/050-1400-requestWrite.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/requestList', {
                templateUrl: '/views/1400-request/050-1410-requestList.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/requestDetail', {
                templateUrl: '/views/1400-request/050-1420-requestDetail.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/contract', {
                templateUrl: '/views/1500-contract/050-1500-contract.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/direction', {
                templateUrl: '/views/1600-direction/050-1600-direction.html'
                //  ,controller: 'Somewhat Controller'
            })
            .when('/login', {
                templateUrl: '/views/1700-login/050-1700-login.html'
                //  ,controller: 'Somewhat Controller'
            });
      /*      .otherwise(({
                redirectTo: '/'
            }));
            */  // dangerous code

    })
    .factory('items', function ($http, $q, $upload) {
        var items = {};
        items.query = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getlist'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

        items.getone = function (id) {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/getboard',
                    data: {id: id}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };


        items.insertF = function ($filess) {
            var deferred = $q.defer();
            var fname = '';
            var $file = $filess[0];
            $upload.upload({
                url: '/server/uploadFile',
                file: $file,
                progress: function (e) {
                }
            }).then(function (data) {
                fname = data.data;
                deferred.resolve(fname);
            }, function (data) {
                alert(data.data);
            });

            ;
            return deferred.promise;
        };


        items.insert = function (title, writer, content, href, file) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/insertboard',
                // title, content, file, href, writer
                data: {title: title, writer: writer, content: content, href: href, file: file}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        items.update = function (id, title, content, href) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateboard',
                // title, content, file, href, id
                data: {id: id, title: title, content: content, href: href}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        items.delete = function (id, file) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/deleteboard',
                data: {id: id, file: file}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        return items;
    })
    .service('SessionInfo', function SessionInfo($rootScope) {
        this.sessionStorageKey = "__SESSION_INFO";

        try {
            $rootScope.currentUser = JSON.parse(sessionStorage.getItem(this.sessionStorageKey) || "{}");
        } catch (e) {
            $rootScope.currentUser = {};
        }

        this.getCurrentUser = function () {
            return $rootScope.currentUser;
        };

        this.setUserInfo = function (info) {
            angular.extend($rootScope.currentUser, info);
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify($rootScope.currentUser));
        };

        this.reset = function () {
            $rootScope.currentUser = {};
            sessionStorage.setItem(this.sessionStorageKey, JSON.stringify($rootScope.currentUser));
        };
    })
    .service('newWinParamExtract', function newWinParamExtract() {
        this.getParamList = function (fullUrl) {
            // ~.html?key=value&key=value... 형태로 넘겼을 때 추출하는 서비스
            var paramList = [];

            try {
                var paramIndex = fullUrl.indexOf('?');

                if (paramIndex != 0 && paramIndex < fullUrl.length) { // 파라미터가 있을 때만 작동
                    var paramFull = fullUrl.substring(paramIndex + 1);
                    var param = paramFull.split('&');

                    var _i, _len = param.length;
                    var obj = {};

                    for (_i = 0; _i < _len; ++_i) {
                        var val = param[_i].split('=');
                        if (val.length > 1) {
                            obj[val[0]] = val[1];
                            paramList.push(obj);
                        }
                    }

                    return paramList;
                }
            }
            catch(e)
            {
                return paramList;
            }
        }
    });