package com.ravenappp;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SmsModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public SmsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SmsModule";
    }

    @ReactMethod
    public void startSmsService() {
        Intent intent = new Intent(reactContext, SmsBackgroundService.class);
        reactContext.startService(intent);
    }
}