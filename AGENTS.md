<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Prototype screens are separate routes (/, /goal, /explore, /portfolio) rendered inside a shared PhoneFrame in __root; all data is mock and local — no backend by design.
- Shared investing controls use the existing Button component and semantic global tokens; this keeps visual-only refinements consistent without altering local simulation logic.
- GoalStateProvider wraps the shared PhoneFrame and owns local goal and portfolio data across routes; navigation must not reset user inputs.
- Demo financial inputs live in prototype-data and all financial outputs derive through pure goal-calculations helpers; screens never duplicate goal data or formulas.
- Target dates derive from the provider's UTC creation date and timeline after hydration; avoid server/client date mismatches and duplicated target-date state.
- Goal editing uses a separate temporary draft committed to central state on save; toggling explanations or forms cannot mutate financial inputs.
