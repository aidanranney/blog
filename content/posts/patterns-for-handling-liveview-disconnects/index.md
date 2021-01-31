---
title: Patterns for Handling LiveView Disconnects
date: 2021-01-31T03:07:22.759Z
description: Server disconnects from LiveView processes present a question of
  how best to recover the last known good state. This post is meant to cover
  some of my notes on a couple approaches, and maybe spark some discussion on
  best practices.
---


# Automatic State Restoration

Since v0.7.0, LiveView has been able to ensure that form data is automatically restored on server reconnects, as well as included the *phx-auto-recover* form binding for handling this recovery manually with handle_event/3. The main assumptions/limitations inherent in this are that:

* Any state that you need to be restored is held in a form, and that form is bound with *phx-change.*
* State which is not held in form inputs can be reconstructed from some source of persistence server-side.

See [this guide](https://hexdocs.pm/phoenix_live_view/0.14.8/form-bindings.html#recovery-following-crashes-or-disconnects) on default behaviour and using the *phx-auto-recover* binding.

# Manual State Restoration

While making use of the *phx-auto-recover* binding allows for specialized handling to re-build state from data passed back by the client, manually recovering any state requires writing a JS hook as well.

***Recovery During the LiveView Mount***

*[get_connect_params/1](https://hexdocs.pm/phoenix_live_view/0.14.8/Phoenix.LiveView.html#get_connect_params/1)* can be used to fetch data passed over by the client when the socket is mounted.\
\
This involves storing some state on the client, and passing this state to the socket *params* before connecting. In the **app.js** file [**admin.ts** in our case], this is something like:

```
let message = "Hello from the client!"

let liveSocket = new LiveSocket("/live", Socket, {params: {message: message}})

liveSocket.connect() 
```

\
Then in the LiveView, something like:

```
def mount(params, session, socket) do
  message = socket |> get_connect_params() |> Map.get(:message)

  IO.inspect(message)

  {:ok, socket}
end
```

\
The most obvious limitation of this approach is that *get_connect_params/1* is only available on mount.\
\
***Recovery During JS Lifecycle Events***In our Ballots LiveView and its nested LiveComponents, this work depends on relying both on functionality built-in to LiveView, as well as some manual handling.\
\
Client-side lifecycle events are used to trigger when state is stashed, as well as pushed back to the server as events. Within a *[reconnected](https://hexdocs.pm/phoenix_live_view/0.14.8/js-interop.html#client-hooks)* callback, stashed data can be supplied to *[pushEvent](https://hexdocs.pm/phoenix_live_view/js-interop.html#client-hooks)*, along with an event name that corresponds to a LiveView *[handle_event/3](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html#c:handle_event/3)* definition. To illustrate a JS Hook that might implement this:

```
const StateRecoveryHook = {
  [mounted/beforeUpdate/updated callback to save state],
  reconnected() {
    this.pushEvent(
      "restore_saved_state",
      {savedState}
    );
  }
};
```

\
In our case, this was applicable to restoring the Ballots parent LiveView, for any *submitted* *selections* made. The state doesn't altogether correspond to any single form's data, and moreover, needs to sync with multiple stateful components, which hold each individual ballot's selected, or saved, choices.\
\
Once this amalgamated state has been re-built, it can be passed on in succession to  the stateful components that it originated from, via *[send_update/2](https://kapeli.com/dash_share?docset_file=phoenix_live_view&docset_name=phoenix_live_view&path=docs/Phoenix.LiveView.html%23send_update/2&platform=hex&repo=Hex%20Docsets&version=0.15.0).*\
\
From this point, thanks to Phoenix's built-in automatic restoration features, restoring un-saved ballots \[or, just the ballot the user is currently in-progress on] becomes simpler. Tracking changes on the client is accomplished with the *phx-change* binding and transforming params from the client with the *phx-auto-recover* binding:

```
<%= form_for ballot....
  phx_change: :change_event,
  phx_auto_recover: :handle_recovery
%>
.
.
.
def handle_event("handle_recovery", params, socket) do
  (handle params and assigns)
  {:noreply, socket}
end
```

\
One gotcha in this two-fold method is that [guidelines for managing state](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveComponent.html#module-managing-state) should be carefully considered. When stateful LiveComponents are rendered, and derive their assigns based on state held in a parent LiveView, those specific assigns should always follow from the parent to that component, otherwise risking becoming difficult to track and sync.

\
Documents of interest!

* [JS Interoperability ](https://hexdocs.pm/phoenix_live_view/0.14.8/js-interop.html)\[client hooks, lifecycle events, etc]
* [Forum post on state recovery](https://elixirforum.com/t/liveview-and-rolling-restarts/23973/9?u=aidan) using get_connect_params