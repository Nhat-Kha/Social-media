import React from "react";

export default function ProfileSetting() {
  return (
    <div class="hidden space-y-6 p-10 pb-16 md:block bg-white">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
        <p class="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div class="shrink-0 bg-border h-[1px] w-full"></div>
      <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
            href="/examples/forms"
          >
            Profile
          </a>
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start"
            href="/examples/forms/account"
          >
            Account
          </a>
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
            href="/examples/forms/appearance"
          >
            Appearance
          </a>
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
            href="/examples/forms/notifications"
          >
            Notifications
          </a>
          <a
            class="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:underline justify-start"
            href="/examples/forms/display"
          >
            Display
          </a>
        </nav>

        <div class="flex-1 lg:max-w-2xl">
          <h2 class="text-lg font-bold tracking-tight">Account</h2>
          <p class="text-sm text-muted-foreground">
            Update your account settings. Set your preferred language and
            timezone.
          </p>
        </div>
      </div>
    </div>
  );
}
