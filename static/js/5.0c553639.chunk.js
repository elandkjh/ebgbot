(this.webpackJsonpebgbot=this.webpackJsonpebgbot||[]).push([[5],{22:function(e,t,r){"use strict";r.r(t),r.d(t,"xmlHttpRequest",(function(){return n}));var s=r(0),n=function(e,t){return new Promise((function(r,n){if("undefined"!=typeof XMLHttpRequest){var o=s.w.of(e),a=o.dispatcher,i=o.logger,c=t.requestId,d=t.method,u=t.url,p=t.headers,f=void 0===p?{}:p,l=t.data,g=void 0===l?"":l,h=t.uploadProgressHandler,b=!1,q=new XMLHttpRequest;q.open(d,u),Object.keys(f).forEach((function(e){q.setRequestHeader(e,f[e])})),h&&q.upload.addEventListener("progress",(function(e){e.lengthComputable?h(c,e.loaded,e.total):i.debug("Progress computing failed: `Content-Length` header is not given.")})),q.onabort=function(){n(s.yc.requestCanceled)},q.onerror=function(e){n(s.yc.networkError)},q.onreadystatechange=function(){if(q.readyState===XMLHttpRequest.DONE&&!b)if(0===q.status||q.status>=200&&q.status<400)try{var t=JSON.parse(q.responseText);r(new s.nc(e,t))}catch(i){n(s.yc.networkError)}else try{var o=JSON.parse(q.responseText);if(o){var i=new s.yc(o);if(i.isSessionExpiredError){if(a.dispatch(new s.n({reason:i.code,message:i.message})),!(q instanceof s.gc)){var c=new s.Gb;return a.dispatch(new s.hc({request:q,deferred:c,error:i})),c.promise}}else i.isSessionInvalidatedError&&a.dispatch(new s.n({reason:i.code,message:i.message}));n(i)}else n(s.yc.requestFailed)}catch(i){n(s.yc.requestFailed)}},a.on((function(e){e instanceof s.Eb&&(e.requestId&&e.requestId!==c||(b=!0,q.abort()))})),q.send(g)}else n(s.yc.xmlHttpRequestNotSupported)}))}}}]);
//# sourceMappingURL=5.0c553639.chunk.js.map