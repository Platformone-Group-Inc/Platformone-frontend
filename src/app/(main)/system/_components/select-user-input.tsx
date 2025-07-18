"use client";

import { faker } from "@faker-js/faker";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
}

// Mock function to generate random users
const getUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  avatar: faker.image.avatar(),
  email: faker.internet.email(),
});

interface Props {
  placeholder?: string;
}

const SelectUserInput: React.FC<Props> = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(
    Array.from({ length: 10 }).map(() => getUser())
  );
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for simulating fetch
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle user removal from selected list
  const handleRemoveUser = (id: string) => {
    setSelectedUsers((s) => s.filter((user) => user.id !== id));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Simulate fetching users after a delay (for dummy loader)
  useEffect(() => {
    if (searchInput.length > 0) {
      setIsLoading(true);
      setOpen(true);

      const timeout = setTimeout(() => {
        setUsers(Array.from({ length: 10 }).map(() => getUser())); // Simulate new user list
        setIsLoading(false);
      }, 1000); // Simulate a 1-second loading delay

      return () => clearTimeout(timeout);
    } else {
      setOpen(false); // Close popover when search input is cleared
    }
  }, [searchInput]);

  // Add selected user to the selected list
  const handleSelectUser = (user: User) => {
    if (!selectedUsers.find((selected) => selected.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
    setSearchInput(""); // Optionally clear the search input
    setOpen(false); // Close popover after selecting
    inputRef.current?.focus(); // Keep focus on the input
  };

  return (
    <div className="flex items-center flex-wrap gap-2 p-2 border rounded-md w-full max-w-3xl">
      {/* Display selected users */}
      {selectedUsers.length === 0 && (
        <p className="px-2 text-sm">Select User</p>
      )}
      {selectedUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-1 p-2 rounded-md border"
          role="listitem"
        >
          <Avatar className="size-5">
            <AvatarImage src={user.avatar} alt={`Avatar of ${user.name}`} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>

          <span className="text-sm font-semibold truncate">{user.name}</span>
          <button
            type="button"
            aria-label={`Remove ${user.name} from selected users`}
            onClick={() => handleRemoveUser(user.id)}
          >
            <XIcon size={16} />
          </button>
        </div>
      ))}

      {/* Search Input */}
      <Input
        ref={inputRef}
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search for employees"
        className="h-10 w-auto bg-transparent outline-0 shadow-none"
        aria-label="Search for users"
        autoFocus
      />

      {/* Popover with search results */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button aria-label="Open user search options" className="hidden" />
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            {/* CommandInput inside Popover */}
            <CommandInput
              value={searchInput}
              onChangeCapture={handleSearchChange}
              placeholder="Search users..."
              className="h-9"
              aria-label="Search users"
            />
            <CommandList role="listbox">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Loading...
                </div>
              ) : (
                <>
                  <CommandEmpty>No users found</CommandEmpty>
                  <CommandGroup>
                    {users
                      .filter(
                        (user) =>
                          user.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase().trim()) // Added trim() for spaces
                      )
                      .map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.id}
                          onSelect={() => handleSelectUser(user)}
                          role="option"
                          aria-label={`Select ${user.name}`}
                        >
                          {user.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectUserInput;
