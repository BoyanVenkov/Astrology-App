import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.resonance.app',
  appName: 'Resonance',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    LocalNotifications: {
      // Add android/app/src/main/res/drawable/ic_stat_icon.png before release.
      smallIcon: 'ic_stat_icon',
      iconColor: '#d4af37',
    },
  },
}

export default config
