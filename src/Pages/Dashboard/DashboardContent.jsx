import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';

const DashboardContent = () => {
  const [content, setContent] = useState([
    {
      id: 1,
      title: 'New Blood Drive at City Hospital',
      type: 'News',
      author: 'Ahmed Hassan',
      date: '2024-05-15',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Success Story: Lives Saved Through Donations',
      type: 'Story',
      author: 'Fatima Khan',
      date: '2024-05-10',
      status: 'Published',
    },
    {
      id: 3,
      title: 'Healthcare Tips for Summer',
      type: 'Blog',
      author: 'Mohammed Ali',
      date: '2024-05-08',
      status: 'Draft',
    },
    {
      id: 4,
      title: 'Community Event: Free Health Camp',
      type: 'Event',
      author: 'Zainab Ahmed',
      date: '2024-05-05',
      status: 'Published',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleDelete = (id) => {
    setContent(content.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setSelectedContent(item);
    setIsDialogOpen(true);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'News':
        return 'bg-blue-100 text-blue-800';
      case 'Story':
        return 'bg-purple-100 text-purple-800';
      case 'Blog':
        return 'bg-green-100 text-green-800';
      case 'Event':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="animate-slideUp">
          <h2 className="text-3xl font-bold text-foreground">Content Management</h2>
          <p className="mt-1 text-muted-foreground">Create and manage news, stories, and blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedContent ? 'Edit Content' : 'Create New Content'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Content Title" defaultValue={selectedContent?.title || ''} />
              <Input placeholder="Content Type (News, Story, Blog, Event)" defaultValue={selectedContent?.type || ''} />
              <textarea
                placeholder="Content description or summary..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                rows="4"
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  {selectedContent ? 'Update' : 'Create'} Content
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {content.filter((c) => c.status === 'Published').length}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Published</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {content.filter((c) => c.status === 'Draft').length}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Drafts</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{content.length}</div>
              <p className="mt-2 text-sm text-muted-foreground">Total Content</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <p className="mt-2 text-sm text-muted-foreground">Contributors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Content ({content.length})</CardTitle>
          <CardDescription>All published and draft content across the platform</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell>{item.author}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;
