package com.lupa.widget;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Pantalla de control de LUPA. La actividad permanece sencilla: el overlay real
 * vive en LupaFloatingService y se inicia solo después de que el usuario lo pide.
 */
public class MainActivity extends Activity {

    private TextView statusText;
    private Button permissionButton;
    private Button startButton;
    private Button stopButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        statusText = findViewById(R.id.status_text);
        permissionButton = findViewById(R.id.permission_button);
        startButton = findViewById(R.id.start_button);
        stopButton = findViewById(R.id.stop_button);

        permissionButton.setOnClickListener(v -> openOverlaySettings());
        startButton.setOnClickListener(v -> startLupa());
        stopButton.setOnClickListener(v -> stopLupa());

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
                && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 20);
        }

        refreshStatus();
    }

    @Override
    protected void onResume() {
        super.onResume();
        refreshStatus();
    }

    private boolean canDrawOverlays() {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(this);
    }

    private void openOverlaySettings() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + getPackageName()));
            startActivity(intent);
        } else {
            Toast.makeText(this, getString(R.string.android_no_permission_needed), Toast.LENGTH_SHORT).show();
        }
    }

    private void startLupa() {
        if (!canDrawOverlays()) {
            Toast.makeText(this, getString(R.string.toast_permission_first), Toast.LENGTH_LONG).show();
            openOverlaySettings();
            return;
        }

        Intent serviceIntent = new Intent(this, LupaFloatingService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(serviceIntent);
        } else {
            startService(serviceIntent);
        }
        Toast.makeText(this, getString(R.string.toast_active), Toast.LENGTH_SHORT).show();
        refreshStatus();
    }

    private void stopLupa() {
        stopService(new Intent(this, LupaFloatingService.class));
        Toast.makeText(this, getString(R.string.toast_inactive), Toast.LENGTH_SHORT).show();
        refreshStatus();
    }

    private void refreshStatus() {
        boolean permission = canDrawOverlays();
        permissionButton.setEnabled(!permission);
        statusText.setText(permission
                ? getString(R.string.status_permission_ready)
                : getString(R.string.status_permission_missing));
    }
}
