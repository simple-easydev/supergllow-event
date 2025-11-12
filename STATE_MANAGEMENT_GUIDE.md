# State Management Guide

This project uses React Context API and custom hooks for state management. All state is centralized in context providers, eliminating prop drilling.

## Architecture

```
App.tsx
├── UserProvider (user authentication state)
├── PartyProvider (party data and draft management)
└── ModalProvider (modal open/close states)
    └── Routes (all screens have access to all contexts)
```

## Available Contexts

### 1. PartyContext

**Location:** `src/contexts/PartyContext.tsx`

**Purpose:** Manages party data and draft persistence

**Hook:** `useParty()`

**State:**
- `party: Party | null` - Current party data
- `setParty: (party: Party | null) => void` - Set party data
- `updateParty: (updates: Partial<Party>) => void` - Update partial party data
- `savePartyDraft: () => void` - Manually save draft to localStorage
- `loadPartyDraft: () => void` - Load draft from localStorage
- `clearPartyDraft: () => void` - Clear draft from localStorage

**Features:**
- Auto-saves draft every 2 seconds when party data changes
- Persists draft to localStorage for recovery
- Type-safe Party interface

**Usage Example:**
```tsx
import { useParty } from '@/contexts/PartyContext';

function MyComponent() {
  const { party, updateParty, loadPartyDraft } = useParty();

  const handleUpdateName = (name: string) => {
    updateParty({ party_name: name });
  };

  useEffect(() => {
    loadPartyDraft(); // Load saved draft on mount
  }, []);

  return <div>{party?.party_name}</div>;
}
```

### 2. ModalContext

**Location:** `src/contexts/ModalContext.tsx`

**Purpose:** Manages modal open/close states

**Hook:** `useModal()`

**State:**
- `isInvitePreviewOpen: boolean` - Invite preview modal state
- `openInvitePreview: () => void` - Open invite preview modal
- `closeInvitePreview: () => void` - Close invite preview modal
- `toggleInvitePreview: () => void` - Toggle invite preview modal

**Features:**
- Centralized modal state (no prop drilling)
- Type-safe modal actions
- Easy to extend for additional modals

**Usage Example:**
```tsx
import { useModal } from '@/contexts/ModalContext';

function MyComponent() {
  const { openInvitePreview, isInvitePreviewOpen } = useModal();

  return (
    <>
      <button onClick={openInvitePreview}>
        Show Preview
      </button>
      {isInvitePreviewOpen && <InvitePreviewModal />}
    </>
  );
}
```

### 3. UserContext

**Location:** `src/contexts/UserContext.tsx`

**Purpose:** Manages user authentication state

**Hook:** `useUser()`

## Custom Hooks

### usePartyForm

**Location:** `src/hooks/usePartyForm.ts`

**Purpose:** Reusable form logic with validation for party creation/editing

**Parameters:**
- `initialData?: Partial<PartyFormData>` - Initial form values

**Returns:**
```typescript
{
  formData: PartyFormData;           // Current form values
  errors: Record<string, string>;     // Validation errors
  isSubmitting: boolean;              // Submission state
  handleChange: (field, value) => void;   // Handle field changes
  handleGiftIdeasChange: (ideas) => void; // Handle gift ideas array
  handleSubmit: () => Promise<boolean>;   // Submit form
  resetForm: () => void;                  // Reset to initial state
}
```

**Validation Rules:**
- `party_name` - Required
- `child_name` - Required
- `event_date` - Required
- `start_time` - Required
- `location` - Required

**Usage Example:**
```tsx
import { usePartyForm } from '@/hooks/usePartyForm';

function PartyForm() {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = usePartyForm();

  const onSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      // Navigate or show success message
    }
  };

  return (
    <form>
      <input
        value={formData.party_name}
        onChange={(e) => handleChange('party_name', e.target.value)}
      />
      {errors.party_name && <span>{errors.party_name}</span>}
      
      <button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

## Type Exports

All types are properly exported for TypeScript:

```typescript
// Import Party type
import { Party } from '@/contexts/PartyContext';
// or
import { Party } from '@/lib/supabase';

// Import all contexts
import { useParty, useModal } from '@/contexts';
```

## Best Practices

1. **Always use hooks inside components** - Don't call hooks in callbacks or conditions
2. **Use updateParty for partial updates** - More efficient than setParty
3. **Load draft on mount** - Call `loadPartyDraft()` when component mounts
4. **Clear draft after submission** - Call `clearPartyDraft()` after successful save
5. **Handle errors gracefully** - Check validation errors before submission

## Migration Example

**Before (Prop Drilling):**
```tsx
// Parent
function Parent() {
  const [party, setParty] = useState(null);
  return <Child party={party} setParty={setParty} />;
}

// Child
function Child({ party, setParty }) {
  return <GrandChild party={party} setParty={setParty} />;
}

// GrandChild
function GrandChild({ party, setParty }) {
  return <div>{party.name}</div>;
}
```

**After (Context):**
```tsx
// Parent
function Parent() {
  return <Child />;
}

// Child
function Child() {
  return <GrandChild />;
}

// GrandChild
function GrandChild() {
  const { party } = useParty();
  return <div>{party?.name}</div>;
}
```

## Adding New Modals

To add a new modal to ModalContext:

1. Add state to `ModalState` interface:
```typescript
interface ModalState {
  isInvitePreviewOpen: boolean;
  isNewModalOpen: boolean;  // Add this
}
```

2. Add actions to context value:
```typescript
const value = {
  // ... existing
  isNewModalOpen,
  openNewModal: () => setModalState(prev => ({ ...prev, isNewModalOpen: true })),
  closeNewModal: () => setModalState(prev => ({ ...prev, isNewModalOpen: false })),
};
```

3. Use in components:
```typescript
const { openNewModal, isNewModalOpen } = useModal();
```
