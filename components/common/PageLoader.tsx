import { Loader2 } from "lucide-react";

interface PageLoaderProps {
	message?: string;
}

export function PageLoader({ message }: PageLoaderProps) {
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center bg-background">
			<Loader2 className="h-8 w-8 animate-spin text-primary" />
			{message && <p className="mt-4 text-muted-foreground">{message}</p>}
		</div>
	);
}
