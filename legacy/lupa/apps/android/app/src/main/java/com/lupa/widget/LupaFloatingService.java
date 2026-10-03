package com.lupa.widget;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Overlay real de Android. Se ejecuta como foreground service porque la burbuja
 * permanece visible aunque el usuario cambie de aplicación.
 */
public class LupaFloatingService extends Service {

    private static final String CHANNEL_ID = "lupa_overlay";
    private static final int NOTIFICATION_ID = 1001;

    private WindowManager windowManager;
    private View floatingView;
    private WindowManager.LayoutParams params;
    private boolean viewAttached;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        startForegroundCompat();
        attachOverlay();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    getString(R.string.channel_name),
                    NotificationManager.IMPORTANCE_LOW);
            channel.setDescription(getString(R.string.channel_description));
            channel.setShowBadge(false);
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private void startForegroundCompat() {
        Intent openIntent = new Intent(this, MainActivity.class);
        int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
        }
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, openIntent, pendingFlags);

        Notification.Builder builder = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? new Notification.Builder(this, CHANNEL_ID)
                : new Notification.Builder(this);
        Notification notification = builder
                .setContentTitle(getString(R.string.app_name))
                .setContentText(getString(R.string.overlay_description))
                .setSmallIcon(android.R.drawable.ic_menu_search)
                .setOngoing(true)
                .setContentIntent(pendingIntent)
                .build();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            startForeground(
                    NOTIFICATION_ID,
                    notification,
                    android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE);
        } else {
            startForeground(NOTIFICATION_ID, notification);
        }
    }

    private void attachOverlay() {
        floatingView = LayoutInflater.from(this).inflate(R.layout.lupa_floating_layout, null);

        int layoutType = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
                ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
                : WindowManager.LayoutParams.TYPE_PHONE;

        params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                layoutType,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                        | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                PixelFormat.TRANSLUCENT);
        params.gravity = Gravity.TOP | Gravity.END;
        params.x = 24;
        params.y = 180;

        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        if (windowManager == null) {
            stopSelf();
            return;
        }

        windowManager.addView(floatingView, params);
        viewAttached = true;
        configureInteractions();
    }

    private void configureInteractions() {
        ImageView bubbleIcon = floatingView.findViewById(R.id.lupa_bubble_icon);
        View panelView = floatingView.findViewById(R.id.lupa_expanded_panel);
        TextView explanationText = floatingView.findViewById(R.id.lupa_explanation_text);
        View variableButton = floatingView.findViewById(R.id.concept_variable);
        View functionButton = floatingView.findViewById(R.id.concept_function);
        View loopButton = floatingView.findViewById(R.id.concept_loop);
        View conditionButton = floatingView.findViewById(R.id.concept_condition);

        panelView.setVisibility(View.GONE);
        bubbleIcon.setContentDescription(getString(R.string.overlay_content_description));

        bubbleIcon.setOnTouchListener(new View.OnTouchListener() {
            private int initialX;
            private int initialY;
            private float initialTouchX;
            private float initialTouchY;
            private boolean moved;

            @Override
            public boolean onTouch(View view, MotionEvent event) {
                switch (event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        initialX = params.x;
                        initialY = params.y;
                        initialTouchX = event.getRawX();
                        initialTouchY = event.getRawY();
                        moved = false;
                        return true;
                    case MotionEvent.ACTION_MOVE:
                        float dx = event.getRawX() - initialTouchX;
                        float dy = event.getRawY() - initialTouchY;
                        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                            moved = true;
                        }
                        params.x = initialX - (int) dx;
                        params.y = initialY + (int) dy;
                        if (windowManager != null && viewAttached) {
                            windowManager.updateViewLayout(floatingView, params);
                        }
                        return true;
                    case MotionEvent.ACTION_UP:
                        if (!moved) {
                            view.performClick();
                        }
                        return true;
                    case MotionEvent.ACTION_CANCEL:
                        return true;
                    default:
                        return false;
                }
            }
        });

        variableButton.setOnClickListener(v -> explanationText.setText(getString(R.string.explanation_variable)));
        functionButton.setOnClickListener(v -> explanationText.setText(getString(R.string.explanation_function)));
        loopButton.setOnClickListener(v -> explanationText.setText(getString(R.string.explanation_loop)));
        conditionButton.setOnClickListener(v -> explanationText.setText(getString(R.string.explanation_condition)));

        bubbleIcon.setOnClickListener(v -> {
            boolean open = panelView.getVisibility() != View.VISIBLE;
            panelView.setVisibility(open ? View.VISIBLE : View.GONE);
            if (open) {
                explanationText.setText(getString(R.string.overlay_hint));
            }
        });
    }

    @Override
    public void onDestroy() {
        if (windowManager != null && floatingView != null && viewAttached) {
            windowManager.removeView(floatingView);
            viewAttached = false;
        }
        stopForeground(STOP_FOREGROUND_REMOVE);
        super.onDestroy();
    }
}
