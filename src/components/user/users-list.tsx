type Props = {
  users: {
    id: string;
    email: string;
    name: string;
  }[];
};

export default function UsersList({ users }: Props) {
  return (
    <div>
      {users.length === 0 && (
        <p className="text-sm text-muted-foreground">no users created</p>
      )}
      {users.map((u) => (
        <div key={u.id}>
          <span className="text-sm mr-4">{u.name}</span>
          <span className="text-sm italic text-muted-foreground">
            {u.email}
          </span>
        </div>
      ))}
    </div>
  );
}
